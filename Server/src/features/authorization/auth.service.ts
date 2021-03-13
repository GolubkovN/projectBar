import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
//Models
import { UserModel } from "../shared/models";
//Repositories
import * as authRepository from "./auth.repository";
//Schemas
import { userLoginSchema, userRegisterSchema } from "./schemas/userRequest.schema";
//Helpers
import {BaseError, HttpStatusCode} from '../../helpers/appError';
import {logger} from '../../helpers/logger';
import key from "../../config/config";

import { ResponseUserModel } from "./models";

// create user
export async function createUser(body: UserModel): Promise<UserModel> {
    const validation: boolean = await userRegisterSchema.isValid(body);

    const {name, email, password} = body;
    const userExist: boolean = Boolean(await authRepository.getUsetByUserName(name));

    if (!validation) {
        logger.info(`There's not enough data in the body`);
        throw new BaseError(`${HttpStatusCode.BAD_REQUEST}`, HttpStatusCode.BAD_REQUEST, `body is not valid`, true);
    }

    if (userExist) {
        logger.error(`user exist`);
        throw new BaseError(`${HttpStatusCode.BAD_REQUEST}`, HttpStatusCode.BAD_REQUEST, `user exist`, true)
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const response: UserModel = await authRepository.createUser(name, email, hashedPassword);

    return response;
}

// create token
async function createToken(email: string, name: string): Promise<string> {
    const accessToken: string = jwt.sign({email: email, name: name}, key.JWT_ENCRYPTION, {expiresIn: key.JWT_EXPIRATION});
    return accessToken;
};  


//login user
export async function loginUser(body: ResponseUserModel): Promise<ResponseUserModel> {
    const validation: boolean = await userLoginSchema.isValid(body);
    const {name, email, password} = body;

    if (!validation) {
        logger.info(`There's not enough data in the body`);
        throw new BaseError(`${HttpStatusCode.BAD_REQUEST}`, HttpStatusCode.BAD_REQUEST, `body is not valid`, true);
    }
    

    const condidate: ResponseUserModel = await authRepository.getUserByEmail(email);
    const comparePassword = await bcrypt.compareSync(password, condidate.password);

    if (!comparePassword) {
        logger.info('email or password not valid!!!!!!!!!');
        throw new BaseError(`${HttpStatusCode.BAD_REQUEST}`, HttpStatusCode.BAD_REQUEST, `body is not valid`, true);
    }

    const token = await createToken(condidate.email, condidate.name);
    condidate.accessToken = `Bearer ${token}`;

    return condidate;
}