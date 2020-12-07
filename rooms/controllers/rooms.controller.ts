import { Room, RoomModel } from "../models/rooms.model";
import { Show, ShowModel } from "../../shows/models/shows.model";
import crypto from 'crypto';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../common/env.config';

export function insert(req: Request, res: Response) {
    RoomModel.createRoom(req.body)
        .then((result) => {
            res.status(StatusCodes.CREATED).send({ id: (<DocumentType<Room>>result)._id });
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
    RoomModel.list(limit, page)
        .then((result) => {
            res.status(StatusCodes.OK).send(result);
        })
};

export function getById(req: Request, res: Response) {
    RoomModel.GetById(req.params.roomId)
        .then((result) => {
            res.status(StatusCodes.OK).send(result);
        });
};

export function patchById(req: Request, res: Response) {
    RoomModel.patchRoom(req.params.roomId, req.body)
        .then((result) => {
            res.status(StatusCodes.NO_CONTENT).send({});
        });
};

export function removeById(req: Request, res: Response) {
    // TODO: ensure no shows are running or scheduled
    let query = { $and: [{ roomId: req.params.roomId, $or: [{ startDate: { $gte: new Date() } }, { endDate: { $gte: new Date() } }] }] };

    ShowModel.find(query)
        .exec(function (err, shows) {
            if (err) {
                res.status(StatusCodes.BAD_REQUEST).send({ error: err });
            }
            else {
                if (shows.length > 0) {
                    res.status(StatusCodes.BAD_REQUEST).send({ error: 'Cannot delete room with scheduled or ongoing shows' });
                }
                else
                {
                    RoomModel.removeById(req.params.roomId)
                        .then((result) => {
                            res.status(StatusCodes.NO_CONTENT).send({});
                        });
                }
            }
        })
};