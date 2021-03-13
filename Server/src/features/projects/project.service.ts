import httpStatus from 'http-status';
import { BaseError, HttpStatusCode } from '../../helpers/appError';
import { logger } from '../../helpers/logger';
import { 
    FeatureModel, 
    filterInterface, 
    RequestCreateProjectModel, 
    RequestDeleteProjectModel, 
    RequestPaginationModel, 
    RequestUpdateProjectModel, 
    ResponseCreateProjectModel, 
    ResponseDeleteProjectModel, 
    ResponsePaginationModel, 
    ResponseUpdateProjectModel 
} from "./models";
import { ResponseProjectModel } from './models/projectModel/project.model.ts';
import * as projectRepository from "./project.repository";
import { ProjectRequestSchema } from "./schemas/projectRequest.schema";

export async function createProject(project: RequestCreateProjectModel): Promise<ResponseCreateProjectModel> {
    const validation: boolean = await ProjectRequestSchema.isValid(project);

    if (!validation) {
        logger.info(`There's not enough data in the body`);
        throw new BaseError(`${HttpStatusCode.BAD_REQUEST}`, HttpStatusCode.BAD_REQUEST, `body is not valid`, true);
    }

    return await projectRepository.createProject({...project, lowerCaseName: project.title.toLowerCase()});
}

export async function getProjects(req: RequestPaginationModel): Promise<ResponsePaginationModel> {
    return await projectRepository.getAllprojects(req);
}

export async function updateProject(body: RequestUpdateProjectModel): Promise<ResponseUpdateProjectModel | null> {
    return await projectRepository.updatePoject(body);
}

export async function deleteProject(body: RequestDeleteProjectModel): Promise<ResponseDeleteProjectModel | null> {
    return await projectRepository.deleteProject(body);
}

export async function getProjectById(body: filterInterface): Promise<ResponseProjectModel | null> {
    return await projectRepository.getProjectById(body);
}

export async function aggregate(featureName: string) {
    return await projectRepository.aggregate(featureName)
}

export async function getFeaturesFromModal(_id: filterInterface, level: string): Promise<FeatureModel[] | null> {
    const targetProject = await projectRepository.getFeaturesFromModal(_id);

    if(targetProject === null || targetProject === undefined) {
        throw new BaseError("400", httpStatus.BAD_REQUEST, "can't find project", true);
    }

    const targetProjectFeatures: FeatureModel[] = targetProject.features.filter((item: FeatureModel) => item.level.split(".")[0] === level);    
    return targetProjectFeatures;
}