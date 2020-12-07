import { Show, ShowModel } from "../models/shows.model";
import crypto from 'crypto';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../common/env.config';

export function insert(req: Request, res: Response) {
    ShowModel.createShow(req.body)
        .then((result) => {
            res.status(StatusCodes.CREATED).send({ id: (<DocumentType<Show>>result)._id });
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
    ShowModel.list(limit, page)
        .then((result) => {
            res.status(StatusCodes.OK).send(result);
        })
};

export function getById(req: Request, res: Response) {
    ShowModel.GetById(req.params.showId)
        .then((result) => {
            res.status(StatusCodes.OK).send(result);
        });
};

export function patchById(req: Request, res: Response) {
    ShowModel.patchShow(req.params.showId, req.body)
        .then((result) => {
            res.status(StatusCodes.NO_CONTENT).send({});
        });
};

export function removeById(req: Request, res: Response) {
    ShowModel.removeById(req.params.showId)
        .then((result) => {
            res.status(StatusCodes.NO_CONTENT).send({});
        });
};