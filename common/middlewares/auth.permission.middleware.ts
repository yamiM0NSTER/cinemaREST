
import express from 'express';

import * as jwt from 'jsonwebtoken'

// const jwt = require('jsonwebtoken'),
const secret = require('../env.config')['jwt_secret'];

const ADMIN_PERMISSION = 4096;

exports.minimumPermissionLevelRequired = (required_permission_level : any) => {
    return (req: any, res: any, next: any) => {
        let user_permission_level = parseInt(req.jwt.permissionLevel);
        let userId = req.jwt.userId;
        if (user_permission_level & required_permission_level) {
            return next();
        } else {
            return res.status(403).send();
        }
    };
};

exports.onlySameUserOrAdminCanDoThisAction = (req: any, res: any, next: any) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    let userId = req.jwt.userId;
    if (req.params && req.params.userId && userId === req.params.userId) {
        return next();
    } else {
        if (user_permission_level & ADMIN_PERMISSION) {
            return next();
        } else {
            return res.status(403).send();
        }
    }

};

exports.sameUserCantDoThisAction = (req: any, res: any, next: any) => {
    let userId = req.jwt.userId;

    if (req.params.userId !== userId) {
        return next();
    } else {
        return res.status(400).send();
    }

};