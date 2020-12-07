import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../common/env.config';
import { StatusCodes } from 'http-status-codes';

class AuthController {
    static login = async (req: Request, res: Response) => {
        // If we get here user exists and password matches

        //Sing JWT, valid for 1 hour
        const token = jwt.sign({ userId: req.body.userId, email: req.body.email }, config.jwt_secret, { expiresIn: "1h" } );

        //Send the jwt in the response
        res.status(StatusCodes.CREATED).send({ accessToken: token});
    };
}
export default AuthController;
