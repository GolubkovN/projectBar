//Vendors
import httpStatus from "http-status";
import projectEntityModel from "./entities/projectSchema.entitie";
import {logger} from "../../helpers/logger";
import { ProjectModel } from "./models/project.model";
import { filterInterface } from "./models/request/filterModel";
import { 
    RequestCreateProjectModel, 
    RequestDeleteProjectModel,
    RequestPaginationModel, 
    RequestUpdateProjectModel, 
    ResponseCreateProjectModel, 
    ResponseDeleteProjectModel, 
    ResponsePaginationModel, 
    ResponseUpdateProjectModel 
} from "./models";
import { ResponseProjectModel } from "./models/projectModel/project.model.ts";
import { BaseError } from "../../helpers/appError";

// create 
export async function createProject(body: RequestCreateProjectModel):Promise<ResponseCreateProjectModel> {
    try {
        const response: ProjectModel = await projectEntityModel.create(body);
        return {ok: true, _id: response._id};

    } catch(err) {
        logger.info(`${httpStatus.BAD_REQUEST}: Data not save`);
        throw new BaseError("400", httpStatus.BAD_REQUEST, "Data not save", true);
    }
}


export async function getAllprojects(req: RequestPaginationModel): Promise<ResponsePaginationModel> {
    const limit = 10;
    let projects: ResponseProjectModel[] = [];

    if(req.sortType === "unset") {
        projects = await projectEntityModel.find()
        .limit(limit)
        .skip((req.page - 1) * limit) as ResponseProjectModel[]
    }
    if(req.sortType === "alpha") {
        projects = await projectEntityModel.find()
        .limit(limit)
        .skip((req.page - 1) * limit).sort({
            lowerCaseName: "asc"
        }) as ResponseProjectModel[]
    }
    if(req.sortType === "alpha-reverse") {
        projects = await projectEntityModel.find()
        .limit(limit)
        .skip((req.page - 1) * limit).sort({
            lowerCaseName: "desc"
        }) as ResponseProjectModel[]

    }
    const docsCount = await projectEntityModel.countDocuments();
    return {
        projects,
        docsCount
    }

}

// update
export async function updatePoject(body: RequestUpdateProjectModel): Promise<ResponseUpdateProjectModel | null> {
    try {
        return await projectEntityModel.findByIdAndUpdate(body._id, body, {
            new: true
        })

    } catch(err) {
        logger.info(`${httpStatus.BAD_REQUEST}: Data not change`);
        throw new BaseError("400", httpStatus.BAD_REQUEST, "Data not change", true);
    }
}

// delete
export async function deleteProject(body: RequestDeleteProjectModel): Promise<ResponseDeleteProjectModel | null> {
    try {
        return await projectEntityModel.findByIdAndDelete(body._id);
    } catch(err) { 
        logger.info(`${httpStatus.BAD_REQUEST}: Data not delete`);
        throw new BaseError("400", httpStatus.BAD_REQUEST, "Data not delete", true);
    }
}

// get one
export async function getProjectById(body: filterInterface): Promise<ResponseProjectModel | null> {
    try {
        return await projectEntityModel.findById(body._id);
    } catch(err) {
        logger.info(`${httpStatus.BAD_REQUEST}: Can't find project`);
        throw new BaseError("400", httpStatus.BAD_REQUEST, "can't find project", true);
    }
}

// aggregate features
export async function aggregate(featureName: string) {
    try {
        let aggregate;
        if(featureName !== "") {
             aggregate = await projectEntityModel.aggregate([
                {$unwind : "$features"}, 
                {
                    $match: { 
                        "features.name": {$regex: "^" + featureName, "$options": "gi"}
                    }, 
                },
                {$project: {_id: true, title: true, features: true}}
            ])
        }
        return aggregate;

    } catch(err) {
        logger.info(`${httpStatus.BAD_REQUEST}: Can't find feature`);
        throw new BaseError("500", httpStatus.INTERNAL_SERVER_ERROR, "can't find project", true);
    }
}

// get features from modal
export async function getFeaturesFromModal(_id: filterInterface) {
    try {
         const targetProject = await projectEntityModel.findById({_id: _id});
         
         return targetProject;
    }catch (err) {
        throw new BaseError("400", httpStatus.BAD_REQUEST, "can't find project", true);
    }
}