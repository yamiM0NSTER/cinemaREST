import { Request, Response, NextFunction } from "express";
import { User, UserModel } from "../../users/models/users.model";
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { StatusCodes } from 'http-status-codes';

export const checkRole = (roles: Array<Number>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previous midleware
        const id = res.locals.jwtPayload.userId;
     
        //Get user role from the database
        let user: DocumentType<User> | null;
        user = null;
        try {
            user = await UserModel.findById(id);
        } catch (id)
        {
            res.status(StatusCodes.UNAUTHORIZED).send();
        }
        
        //Check if array of authorized roles includes the user's role
        if (user != null && roles.indexOf(<Number>user.permissionLevel) > -1) {
            next();
        }
        else {
            res.status(StatusCodes.UNAUTHORIZED).send();
        } 
    };
};