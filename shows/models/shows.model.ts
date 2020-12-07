import { prop, getModelForClass } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import * as mongoose from 'mongoose';
import {DocumentCT} from '../../common/DocumentCT'

export class Show extends DocumentCT {
    @prop()
    startDate!: Date;
    @prop()
    endDate!: Date;

    @prop()
    roomId!: string;
    @prop()
    movieId!: string;

    public findById(this: DocumentType<Show>, callback?: (err: any, res: any[]) => void) {
        return this.model('Shows').find({ id: this.id }, callback);
    }

    public static GetById(id: any/*mongoose.Types.ObjectId*/) {
        // todo use projection?
        return ShowModel.findById(id)
            .then((result) => {
                let res : any = result?.toJSON();
                delete res?._id;
                delete res?.__v;
                return res;
            });
    }

    public static createShow(showData: any) {
        const show = new ShowModel(showData);
        return show.save();
    }

    public static list(perPage: number, page: number) {
        let Projection = {
            __v: false,
            // _id: true,
            password : false,
        };

        return new Promise((resolve, reject) => {
            ShowModel.find({}, Projection)
                .limit(perPage)
                .skip(perPage * page)
                .exec(function (err, shows) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(shows);
                    }
                })
        });
    }

    public static patchShow(id: any, showData: any) {
        return ShowModel.findOneAndUpdate({
            _id: id
        }, showData);
    }

    public static removeById(showId: any) {
        return new Promise((resolve, reject) => {
            ShowModel.deleteMany({ _id: showId }, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(err);
                }
            });
        });
    }
}

export const ShowModel = getModelForClass(Show);