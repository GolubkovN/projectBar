import { BaseResponseModel } from "../../../shared/models";

export interface ResponseUserModel extends BaseResponseModel {
    _id?: string;
    name: string;
    email: string;
    password: string;
    accessToken?: string;
}