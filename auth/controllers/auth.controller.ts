import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
//import { getRepository } from "typeorm";
// import { validate } from "class-validator";

// import { User } from "../entity/User";
import config from '../../common/env.config';
import { User, UserModel } from "../../users/models/users.model";
import { StatusCodes } from 'http-status-codes';
import { DocumentType } from '@typegoose/typegoose/lib/types';

class AuthController {
    static login = async (req: Request, res: Response) => {
        // If we get here user exists and password matches

        //Sing JWT, valid for 1 hour
        const token = jwt.sign({ userId: req.body.userId, email: req.body.email }, config.jwt_secret, { expiresIn: "1h" } );

        //Send the jwt in the response
        res.status(StatusCodes.CREATED).send({ accessToken: token});
    };

    // static changePassword = async (req: Request, res: Response) => {
    //     //Get ID from JWT
    //     const id = res.locals.jwtPayload.userId;

    //     //Get parameters from the body
    //     const { oldPassword, newPassword } = req.body;
    //     if (!(oldPassword && newPassword)) {
    //         res.status(400).send();
    //     }

    //     //Get user from the database
    //     const userRepository = getRepository(User);
    //     let user: User;
    //     try {
    //         user = await userRepository.findOneOrFail(id);
    //     } catch (id) {
    //         res.status(401).send();
    //     }

    //     //Check if old password matchs
    //     if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
    //         res.status(401).send();
    //         return;
    //     }

    //     //Validate de model (password lenght)
    //     user.password = newPassword;
    //     const errors = await validate(user);
    //     if (errors.length > 0) {
    //         res.status(400).send(errors);
    //         return;
    //     }
    //     //Hash the new password and save
    //     user.hashPassword();
    //     userRepository.save(user);

    //     res.status(204).send();
    // };
}
export default AuthController;
