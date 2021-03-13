import { defineAction } from "rd-redux-utils";
import { ProjectModel } from "../models/projectModel";
import { AddFeatureFromModelRequestModel } from "../models/request/addFeaturesFromModalRequest.model";
import { RequestPaginationModel } from "../models/request/requestPagination.model";


export const getAllProjectsAction = defineAction<{request: RequestPaginationModel}>("GET_ALL_PROJECTS")
export const deleteProjectAction = defineAction<{_id: string | undefined}>("DELETE_PROJECT")
export const getOneProjectAction = defineAction<{_id: string | undefined}>("GET_ONE_PROJECT")
export const updateProjectAction = defineAction<{payload: ProjectModel}>("UPDATE_PROJECT")
export const getAggregateFeatures = defineAction<{name: string}>("AGGREGATE_FEATURES")
export const cleanAggregateFeaturesAction = defineAction<{features: null}>("CLEAN_AGGREGATE")
export const addFeaturesFromModalAction = defineAction<AddFeatureFromModelRequestModel>("GET_FEATURES")
export const resetModalFeaturesAction = defineAction<{modalFeatures: null}>("RESET_FEATURES")


