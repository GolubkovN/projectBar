import { Action } from "redux";
import { ResponseFeatureModel } from "../models/response/responseFeature.model";
import { ResponseProjectModel } from "../../../shared/models/responseProject.model";
import { ResponseSearchFeatures } from "../models/response/responseSearchFeatures";
import { cleanAggregateFeaturesAction, resetModalFeaturesAction } from "./actions";
import { 
    getAtServerStartedAction, 
    getAtServerCompletedAction,
    deleteAtServerStartedAction,
    deleteAtServerCompletedAction,
    getOneProjectCompletedAction,
    getOneProjectStarteedAction,
    updateProjectCompletedAction,
    updateProjectStartedAction,
    aggregateFeaturesStartedAction,
    aggregateFeaturesCompletedAction,
    getFeaturesFromModalCompleted,
    getFeaturesFromModalStarted,
} from "./saga/handleProjects";


export interface InitialState {
    status: "initial" | "running" | "success" | "error";
    error?: string;
    projects?: ResponseProjectModel[];
    projectsCount?: number;
    project?: ResponseProjectModel;
    features?: ResponseSearchFeatures[] | null;
    modalFeatures?: ResponseFeatureModel[] | null;
    featureIndex?: number | null;
    featureLevel?: string;
}

export function ProjectsReducer(state: InitialState = { status: "initial", projects: [], project: {} as ResponseProjectModel, features: null, modalFeatures: null, featureLevel:"", featureIndex: null, projectsCount: 0 }, action: Action): InitialState {
    if (getAtServerStartedAction.is(action)) {
        return {
            ...state,
            status: "running",
            error: undefined
        };
    }

    if (getAtServerCompletedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            error: action.error,
            projects: action.projects,
            projectsCount: action.projectsCount
        };
    }

    if (deleteAtServerStartedAction.is(action)) {
        return {
            ...state,
            status: "running",
            error: undefined
        }
    }

    if (deleteAtServerCompletedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            error: action.error
        }
    }

    if (getOneProjectStarteedAction.is(action)) {
        return {
            ...state,
            status: "running",
            error: undefined
        };
    }

    if (getOneProjectCompletedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            error: action.error,
            project: action.project
        };
    }

    if (updateProjectStartedAction.is(action)) {
        return {
            ...state,
            status: "running",
            error: undefined
        };
    }

    if (updateProjectCompletedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            error: action.error,
        };
    }

    if (aggregateFeaturesStartedAction.is(action)) {
        return {
            ...state,
            status: "running",
            error: undefined
        };
    }

    if (aggregateFeaturesCompletedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            error: action.error,
            features: action.features,
        };
    }

    if (cleanAggregateFeaturesAction.is(action)) {
        return {
            ...state,
            features: action.features,
        }
    }
    if (getFeaturesFromModalStarted.is(action)) {
        return {
            ...state,
            status: "running",
            error: undefined
        }
    }
    if (getFeaturesFromModalCompleted.is(action)) {
        return {
            ...state,
            status: action.status,
            error: action.error,
            modalFeatures: action.modalFeatures,
            featureIndex: action.featureIndex,
            featureLevel: action.featureLevel,
        }
    }

    if (resetModalFeaturesAction.is(action)) {
        return {
            ...state,
            modalFeatures: action.modalFeatures
        }
    }

    return state;
}
