// const UserModel = require('../../users/models/users.model');
// const crypto = require('crypto');
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { User, UserModel } from "../../users/models/users.model";
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { StatusCodes } from 'http-status-codes';

class VerifyUserMiddleware {
    static hasAuthValidFields = (req: Request , res : Response, next: NextFunction) => {
        let errors = [];

        if (req.body) {
            if (!req.body.email) {
                errors.push('Missing email field');
            }
            if (!req.body.password) {
                errors.push('Missing password field');
            }

            if (errors.length) {
                return res.status(StatusCodes.BAD_REQUEST).send({ errors: errors.join(',') });
            } else {
                return next();
            }
        } else {
            return res.status(StatusCodes.BAD_REQUEST).send({ errors: 'Missing email and password fields' });
        }
    };

    static isPasswordAndUserMatch = (req: Request, res: Response, next: NextFunction) => {
        UserModel.findByEmail(req.body.email)
            .then((user) => {
                if (!user[0]) {
                    res.status(StatusCodes.NOT_FOUND).send({});
                } else {
                    let passwordFields = user[0].password.split('$');
                    let salt = passwordFields[0];
                    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                    if (hash === passwordFields[1]) {
                        req.body = {
                            userId: user[0]._id,
                            email: user[0].email,
                            permissionLevel: user[0].permissionLevel,
                            provider: 'email',
                            name: user[0].firstName + ' ' + user[0].lastName,
                        };
                        return next();
                    } else {
                        return res.status(StatusCodes.BAD_REQUEST).send({ errors: ['Invalid e-mail or password'] });
                    }
                }
            });
    };
}

export default VerifyUserMiddleware;