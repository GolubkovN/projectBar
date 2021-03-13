export interface IResponseUserModel {
    id: string;
    name: string;
    email: string;
    password?: string;
    accessToken?: string | number;
};