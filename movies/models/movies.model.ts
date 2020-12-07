import { prop, getModelForClass } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import * as types from '@typegoose/typegoose/lib/types';
import * as mongoose from 'mongoose';
import {DocumentCT} from '../../common/DocumentCT'

export class Movie extends DocumentCT {
    @prop()
    Title!: string;

    @prop()
    firstName!: String;
    @prop()
    lastName!: String;
    @prop()
    email!: String;
    @prop()
    password!: String;
    @prop()
    permissionLevel!: Number;


    public findById(this: types.DocumentType<Movie>, callback?: (err: any, res: any[]) => void) {
        return this.model('Shows').find({ id: this.id }, callback);
    }

    public static GetById(id: any/*mongoose.Types.ObjectId*/) {
        // todo use projection?
        return MovieModel.findById(id)
            .then((result) => {
                let res : any = result?.toJSON();
                delete res?._id;
                delete res?.__v;
                delete res?.password;
                return res;
            });
    }

    public static createMovie(movieData: any) {
        const movie = new MovieModel(movieData);
        return movie.save();
    }

    public static list(perPage: number, page: number) {
        let Projection = {
            __v: false,
            // _id: true,
            password : false,
        };

        return new Promise((resolve, reject) => {
            MovieModel.find({}, Projection)
                .limit(perPage)
                .skip(perPage * page)
                .exec(function (err, movies) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(movies);
                    }
                })
        });
    }

    public static patchMovie(id: any, showData: any)
    {
        return MovieModel.findOneAndUpdate({
            _id: id
        }, showData);
    }

    public static removeById(showId: any) {
        return new Promise((resolve, reject) => {
            MovieModel.deleteMany({ _id: showId }, (err) => {
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

export const MovieModel = getModelForClass(Movie);