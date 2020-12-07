import VerifyUserMiddleware from './middlewares/verify.user.middleware'
import { CommonRoutesConfig } from '../common/routes.config';
import express from 'express';
import AuthController from './controllers/auth.controller';

export class AuthRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
    }

    configureRoutes() {
        this.app.route(`/auth`)
            .post([
                VerifyUserMiddleware.hasAuthValidFields,
                VerifyUserMiddleware.isPasswordAndUserMatch,
                AuthController.login
            ]);

        return this.app;
    }
}