//Vendors
import { model, Schema } from "mongoose";
import { Document } from 'mongoose';
import { UserModel } from "../../shared/models";

interface UserSchemaModel extends Document{
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<UserSchemaModel>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});


export default model<UserSchemaModel>("User", userSchema);