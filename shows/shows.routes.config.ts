import {CommonRoutesConfig} from '../common/routes.config';
import express from 'express';
import * as ShowsController from './controllers/shows.controller';
import config from '../common/env.config';
import { checkJwt } from "../common/middlewares/auth.jwt.middleware";
import { checkRole } from "../common/middlewares/auth.role.middleware";

export class ShowsRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'ShowsRoutes');
    }

    configureRoutes() {
        this.app.route(`/shows`)
            .get([
                checkJwt,
                checkRole([config.permissionLevels.NORMAL_USER, config.permissionLevels.ADMIN]),
                ShowsController.list
            ])
            .post([
                checkJwt,
                checkRole([config.permissionLevels.NORMAL_USER, config.permissionLevels.ADMIN]),
                ShowsController.insert
            ]);
    
        this.app.route(`/shows/:showId`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // this middleware function runs before any request to /users/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get([
                checkJwt,
                checkRole([config.permissionLevels.NORMAL_USER, config.permissionLevels.ADMIN]),
                ShowsController.getById
            ])
            .patch([
                checkJwt,
                checkRole([config.permissionLevels.NORMAL_USER, config.permissionLevels.ADMIN]),
                ShowsController.patchById
            ])
            .delete( [
                checkJwt,
                checkRole([config.permissionLevels.NORMAL_USER, config.permissionLevels.ADMIN]),
                ShowsController.removeById
            ]);
    
        this.app.route(`/roomshows/:roomId`)
            .get([
                checkJwt,
                checkRole([config.permissionLevels.NORMAL_USER, config.permissionLevels.ADMIN]),
                ShowsController.getShowsByRoomId
            ]);
        return this.app;
    }
}