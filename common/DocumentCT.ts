import { Exclude, Expose, Transform } from 'class-transformer';
import * as mongoose from 'mongoose';

// re-implement base Document to allow class-transformer to serialize/deserialize _id and __v
export class DocumentCT {
    @Expose()
    @Transform(
        // deserialize ObjectId into a string
        (value: any) => value instanceof mongoose.Types.ObjectId
            ? value.toHexString()
            : value,
        { toClassOnly: true })
    public _id!: string;

    @Expose()
    public __v!: number;
}