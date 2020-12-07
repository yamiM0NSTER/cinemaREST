import { prop, getModelForClass } from '@typegoose/typegoose';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { DocumentCT } from '../../common/DocumentCT'

export class User extends DocumentCT {
    @prop()
    firstName!: string;
    @prop()
    lastName!: string;
    @prop()
    email!: string;
    @prop()
    password!: string;
    @prop()
    permissionLevel!: number;

    public findById(this: DocumentType<User>, cb:any) {
        return this.model('Users').find({ id: this.id }, cb);
    }

    public static findByEmail(email : string) {
        return UserModel.find({ email: email });
    }

    public static GetById(id: any/*mongoose.Types.ObjectId*/) {
        // TODO: use projection?
        return UserModel.findById(id)
            .then((result) => {
                let res : any = result?.toJSON();
                delete res?._id;
                delete res?.__v;
                delete res?.password;
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

    public static patchUser(id: any, userData: any)
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