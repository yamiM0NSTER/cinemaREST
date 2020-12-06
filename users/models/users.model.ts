import { prop, getModelForClass } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import * as types from '@typegoose/typegoose/lib/types';
import * as mongoose from 'mongoose';
import {DocumentCT} from '../../common/DocumentCT'

export class User extends DocumentCT {
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

    // get id() {
    //     return this.id.toHexString();
    // }
    // get id() {
    //     // return this._id._id.toHexString();
    //     return this._id?.toHexString();
    // }

    public findById(this: types.DocumentType<User>, cb:any) {
        return this.model('Users').find({ id: this.id }, cb);
    }

    public static findByEmail(email : string) {
        return UserModel.find({ email: email });
    }

    public static GetById(id: mongoose.Types.ObjectId) {
        return UserModel.findById(id)
            .then((result) => {
                let res : any = result?.toJSON();
                delete res?._id;
                delete res?.__v;
                return res;
            });
    }

    public static createUser(userData: any) {
        const user = new UserModel(userData);
        return user.save();
    }

    public static list(perPage: number, page: number) {
        let usersProjection = {
            __v: false,
            // _id: true,
            password : false,
        };

        return new Promise((resolve, reject) => {
            UserModel.find({}, usersProjection)
                .limit(perPage)
                .skip(perPage * page)
                .exec(function (err, users) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(users);
                    }
                })
        });
    }

    public static patchUser(id: any, userData:any)
    {
        return UserModel.findOneAndUpdate({
            _id: id
        }, userData);
    }

    public static removeById(userId: any) {
        return new Promise((resolve, reject) => {
            UserModel.deleteMany({ _id: userId }, (err) => {
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

export const UserModel = getModelForClass(User);