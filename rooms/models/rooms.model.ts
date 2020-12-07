import { prop, getModelForClass } from '@typegoose/typegoose';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { DocumentCT } from '../../common/DocumentCT'

export class Room extends DocumentCT {
    @prop()
    Name!: string;

    @prop()
    seats!: number;

    public findById(this: DocumentType<Room>, callback?: (err: any, res: any[]) => void) {
        return this.model('Rooms').find({ id: this.id }, callback);
    }

    public static GetById(id: any/*mongoose.Types.ObjectId*/) {
        // todo use projection?
        return RoomModel.findById(id)
            .then((result) => {
                let res : any = result?.toJSON();
                delete res?._id;
                delete res?.__v;
                delete res?.password;
                return res;
            });
    }

    public static createRoom(roomData: any) {
        const room = new RoomModel(roomData);
        return room.save();
    }

    public static list(perPage: number, page: number) {
        let Projection = {
            __v: false,
            // _id: true,
            password : false,
        };

        return new Promise((resolve, reject) => {
            RoomModel.find({}, Projection)
                .limit(perPage)
                .skip(perPage * page)
                .exec(function (err, rooms) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rooms);
                    }
                })
        });
    }

    public static patchRoom(id: any, roomData: any)
    {
        return RoomModel.findOneAndUpdate({
            _id: id
        }, roomData);
    }

    public static removeById(roomId: any) {
        return new Promise((resolve, reject) => {
            RoomModel.deleteMany({ _id: roomId }, (err) => {
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

export const RoomModel = getModelForClass(Room);