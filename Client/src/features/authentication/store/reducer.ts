import { Action } from "redux";
import { 
    registrAtServerStartedAction, 
    registrAtServerCompletedAction, 
    loginAtServerStartedAction, 
    loginAtServerCompletedAction, 
} from "./saga/handleAuth";

import { LoginDataModel } from "../models/ResponseLoginDataModel";
import { resetLoginDataAction } from "./actions";

export interface InitialAppState {
    status: "initial" | "running" | "success" | "error";
    error?: string;
    showNotice?: boolean;
    loginData?: LoginDataModel | null;
}

export function UserReducer(state: InitialAppState = { status: "initial"}, action: Action): InitialAppState {
    if (registrAtServerStartedAction.is(action)) {
        return {
            ...state,
            status: "running",
            error: undefined
        };
    }
    if (registrAtServerCompletedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            error: action.error,
            loginData: action.loginData
        };
    }
    if (loginAtServerStartedAction.is(action)) {
        return {
            ...state,
            status: "running",
            error: undefined
        };
    }
    if (loginAtServerCompletedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            error: action.error,
            showNotice: action.showNotice
        };
    }
    if (resetLoginDataAction.is(action)) {
        return {
            ...state,
            loginData: action.loginData
        };
    }

    return state;
}
