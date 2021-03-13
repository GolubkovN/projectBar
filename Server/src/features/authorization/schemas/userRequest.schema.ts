import { object, string } from "yup";
import { UserModel } from "../../shared/models";

export const userRegisterSchema = object<UserModel>().shape(
    {
        name: string().required(),
        email: string().required(),
        password: string().required(),
    }
);

export const userLoginSchema = object<UserModel>().shape(
    {
        email: string().required(),
        password: string().required(),
    }
);