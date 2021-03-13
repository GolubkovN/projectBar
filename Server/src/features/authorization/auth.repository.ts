//Vendors
import httpStatus from "http-status";
import {logger} from "../../helpers/logger";
import {ResponseUserModel} from "./models/responseUserModel/responseUser.model";
//Entities
import userEntityModel from "./entities/userSchema.entity";


export async function getUsetByUserName(name: string): Promise<number> {
  logger.info(userEntityModel.countDocuments({name}))
  return await userEntityModel.countDocuments({name});
}

export async function createUser(name: string, email: string, password: string,): Promise<ResponseUserModel> {
  try {
    return await userEntityModel.create({name, email, password})
  } catch (error) {
    logger.info(`${httpStatus.BAD_REQUEST}: Data not save`);
    throw { statusCode: httpStatus.BAD_REQUEST, message: "Data not save" };
  }
}

export async function getUserByEmail(email: string) {

  try {
    const condidate = await userEntityModel.findOne({email: email});
    if (!condidate) {
      logger.info(condidate)
      throw new Error(`404 user not found`)
    }

    const response: ResponseUserModel = {
      ok: true,
      _id: condidate._id,
      name: condidate.name,
      email: condidate.email,
      password: condidate.password,
    };

    return response;

  } catch (err) {
    logger.error(err)
    throw new Error(err)
  }
}