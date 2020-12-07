import {CommonRoutesConfig} from '../common/routes.config';
import express from 'express';
import * as RoomsController from './controllers/rooms.controller';
import config from '../common/env.config';
import { checkJwt } from "../common/middlewares/auth.jwt.middleware";
import { checkRole } from "../common/middlewares/auth.role.middleware";

export class RoomsRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'RoomsRoutes');
    }

    configureRoutes() {
        this.app.route(`/rooms`)
            .get([
                checkJwt,
                checkRole([config.permissionLevels.NORMAL_USER, config.permissionLevels.ADMIN]),
                RoomsController.list
            ])
            .post([
                checkJwt,
                checkRole([config.permissionLevels.NORMAL_USER, config.permissionLevels.ADMIN]),
                RoomsController.insert
            ]);
    
        this.app.route(`/rooms/:roomId`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // this middleware function runs before any request to /users/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get([
                checkJwt,
                checkRole([config.permissionLevels.NORMAL_USER, config.permissionLevels.ADMIN]),
                RoomsController.getById
            ])
            .patch([
                checkJwt,
                checkRole([config.permissionLevels.NORMAL_USER, config.permissionLevels.ADMIN]),
                RoomsController.patchById
            ])
            .delete( [
                checkJwt,
                checkRole([config.permissionLevels.NORMAL_USER, config.permissionLevels.ADMIN]),
                RoomsController.removeById
            ]);
    
        return this.app;
    }
}