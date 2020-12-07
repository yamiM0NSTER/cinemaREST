import {CommonRoutesConfig} from '../common/routes.config';
import express from 'express';
import * as MoviesController from './controllers/movies.controller';
import config from '../common/env.config';
import { checkJwt } from "../common/middlewares/auth.jwt.middleware";
import { checkRole } from "../common/middlewares/auth.role.middleware";

export class MoviesRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'MoviesRoutes');
    }

    configureRoutes() {
        this.app.route(`/movies`)
            .get([
                checkJwt,
                checkRole([config.permissionLevels.NORMAL_USER, config.permissionLevels.ADMIN]),
                MoviesController.list
            ])
            .post([
                checkJwt,
                checkRole([config.permissionLevels.NORMAL_USER, config.permissionLevels.ADMIN]),
                MoviesController.insert
            ]);
    
        this.app.route(`/movies/:movieId`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // this middleware function runs before any request to /users/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get([
                checkJwt,
                checkRole([config.permissionLevels.NORMAL_USER, config.permissionLevels.ADMIN]),
                MoviesController.getById
            ])
            .patch([
                checkJwt,
                checkRole([config.permissionLevels.NORMAL_USER, config.permissionLevels.ADMIN]),
                MoviesController.patchById
            ])
            .delete( [
                checkJwt,
                checkRole([config.permissionLevels.NORMAL_USER, config.permissionLevels.ADMIN]),
                MoviesController.removeById
            ]);
    
        return this.app;
    }
}