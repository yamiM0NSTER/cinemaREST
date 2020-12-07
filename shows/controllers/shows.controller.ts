import { Show, ShowModel } from "../models/shows.model";
import { MovieModel } from "../../movies/models/movies.model";
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment';

export function insert(req: Request, res: Response) {
    MovieModel.findById(req.body.movieId).then((movie) => {
        let insertStart = new Date(req.body.startDate);
        let insertEnd = req.body.endDate = moment(insertStart).add(movie?.Length, 'm').toDate();
        let startsDuring = { $and: [{ startDate: { $lt: insertStart } }, { endDate: { $gt: insertStart } }] };
        let endsDuring = { $and: [{ startDate: { $lt: insertEnd } }, { endDate: { $gt: insertEnd } }] };
        let query = { $and: [{ roomId: req.body.roomId }, {$or: [startsDuring, endsDuring]}]};

        ShowModel.find(query).then((shows) => {
            if(shows.length > 0) {
                res.status(StatusCodes.BAD_REQUEST).send({ error: 'Cannot run multiple shows at same time in a room.' });
            }
            else {
                ShowModel.createShow(req.body)
                    .then((result) => {
                        res.status(StatusCodes.CREATED).send({ id: (<DocumentType<Show>>result)._id });
                    });
            }
        })
    })
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
    ShowModel.findOne({ _id: req.params.showId})
        .then((show) => {
            MovieModel.findById(show!.movieId).then((movie) => {
                let insertStart = req.body.startDate ? new Date(req.body.startDate) : show?.startDate;
                let insertEnd = req.body.endDate = moment(insertStart).add(movie?.Length, 'm').toDate();
                let startsDuring = { $and: [{ startDate: { $lt: insertStart } }, { endDate: { $gt: insertStart } }] };
                let endsDuring = { $and: [{ startDate: { $lt: insertEnd } }, { endDate: { $gt: insertEnd } }] };
                let room = req.body.roomId ? req.body.roomId : show?.roomId;
                let query = { $and: [{ roomId: room }, { $or: [startsDuring, endsDuring] }] };

                ShowModel.find(query).then((shows) => {
                    if (shows.length > 0) {
                        res.status(StatusCodes.BAD_REQUEST).send({ error: 'Cannot run multiple shows at same time in a room.' });
                    }
                    else {
                        ShowModel.patchShow(req.params.showId, req.body)
                            .then((result) => {
                                res.status(StatusCodes.NO_CONTENT).send({});
                            });
                    }
                })
            })
        })    
};

export function removeById(req: Request, res: Response) {
    ShowModel.removeById(req.params.showId)
        .then((result) => {
            res.status(StatusCodes.NO_CONTENT).send({});
        });
};

export function getShowsByRoomId(req: Request, res: Response) {
    ShowModel.getShowsByRoomId(req.params.roomId)
        .then((result) => {
            res.status(StatusCodes.OK).send(result);
        });
};