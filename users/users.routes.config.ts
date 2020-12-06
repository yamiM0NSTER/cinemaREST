import {CommonRoutesConfig} from '../common/routes.config';
import express from 'express';
import * as UsersController from './controllers/users.controller';
// const UsersController = require('./controllers/users.controller');
import config from '../common/env.config';
// const config = require('../common/env.config');
// const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
import { checkJwt } from "../common/middlewares/auth.jwt.middleware";
import { checkRole } from "../common/middlewares/auth.role.middleware";

export class UsersRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes() {
        this.app.route(`/users`)
            // .get((req: express.Request, res: express.Response) => {
            //     res.status(200).send(`List of users`);
            // })
            // .post((req: express.Request, res: express.Response) => {
            //     res.status(200).send(`Post to users`);
            // })
            .get([
                //ValidationMiddleware.validJWTNeeded,
                // PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_USER),
                checkJwt,
                checkRole([config.permissionLevels.ADMIN]),
                UsersController.list
            ])
            .post([
                UsersController.insert
            ]);
    
        this.app.route(`/users/:userId`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // this middleware function runs before any request to /users/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`GET requested for id ${req.params.userId}`);
            })
            .put((req: express.Request, res: express.Response) => {
                res.status(200).send(`PUT requested for id ${req.params.userId}`);
            })
            .patch((req: express.Request, res: express.Response) => {
                res.status(200).send(`PATCH requested for id ${req.params.userId}`);
            })
            .delete((req: express.Request, res: express.Response) => {
                res.status(200).send(`DELETE requested for id ${req.params.userId}`);
            });
    
        return this.app;
    }
}