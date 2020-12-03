import { UserClass } from '../models/users.model';
import UserModel from '../models/users.model';
import crypto from 'crypto';
import * as types from '@typegoose/typegoose/lib/types';
import express from 'express';

export function insert(req: express.Request, res: express.Response) {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({ id: (<types.DocumentType<UserClass>>result)._id });
        });
}
// TODO: express.Request
export function list(req: any, res: express.Response) {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

export function getById(req: express.Request, res: express.Response) {
    UserModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

export function patchById(req: express.Request, res: express.Response) {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

export function removeById(req: express.Request, res: express.Response) {
    UserModel.removeById(req.params.userId)
        .then((result) => {
            res.status(204).send({});
        });
};