import { User, UserModel } from "../../users/models/users.model";
import crypto from 'crypto';
import * as types from '@typegoose/typegoose/lib/types';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../common/env.config';

export function insert(req: Request, res: Response) {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = config.permissionLevels.NORMAL_USER;
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(StatusCodes.CREATED).send({ id: (<types.DocumentType<User>>result)._id });
        });
}

export function list(req: Request, res: Response) {
    // Temporary fix for typescript crying (req.query as any)
    let limit = req.query.limit && (req.query as any).limit <= 100 ? parseInt((req.query as any).limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            (req.query as any).page = parseInt((req.query as any).page);
            page = Number.isInteger(req.query.page) ? (req.query as any).page : 0;
        }
    }
    UserModel.list(limit, page)
        .then((result) => {
            res.status(StatusCodes.OK).send(result);
        })
};

export function getById(req: Request, res: Response) {
    UserModel.findById(req.params.userId)
        .then((result) => {
            res.status(StatusCodes.OK).send(result);
        });
};

export function patchById(req: Request, res: Response) {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(StatusCodes.NO_CONTENT).send({});
        });
};

export function removeById(req: Request, res: Response) {
    UserModel.removeById(req.params.userId)
        .then((result) => {
            res.status(StatusCodes.NO_CONTENT).send({});
        });
};