import { Router } from "express";
import { ApiEndpointsConstants } from "../../config/api-endpoints.constants";
import { checkJwtToken } from "../../helpers/checkToken";

//Controllers
import * as projectController from "./project.controller";

export const projectRouter: Router = Router();

projectRouter.post(ApiEndpointsConstants.CREATE_PROJECT, checkJwtToken, projectController.createProject);
projectRouter.post(ApiEndpointsConstants.GET_PROJECTS, checkJwtToken, projectController.getProjects);
projectRouter.put(ApiEndpointsConstants.UPDATE_PROJECTS, checkJwtToken, projectController.updateProject);
projectRouter.delete(ApiEndpointsConstants.DELETE_PROJECTS, projectController.deleteProject);
projectRouter.get(ApiEndpointsConstants.GET_ONE_PROJECT, checkJwtToken, projectController.getProjectById);
projectRouter.get(ApiEndpointsConstants.AGGREGATE, projectController.aggregate);
projectRouter.get(ApiEndpointsConstants.GET_FEATURES, projectController.getFeaturesFromModal);





