// const VerifyUserMiddleware = require('./middlewares/verify.user.middleware');
// const AuthorizationController = require('./controllers/authorization.controller');
// const AuthValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
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

        // this.app.route('/auth/refresh')
        //     .post([
        //         AuthValidationMiddleware.validJWTNeeded,
        //         AuthValidationMiddleware.verifyRefreshBodyField,
        //         AuthValidationMiddleware.validRefreshNeeded,
        //         AuthController.login
        //     ]);

        return this.app;
    }
}