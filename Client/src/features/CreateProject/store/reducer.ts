import { Action } from "redux";
import { 
    createAtServerStartedAction, 
    createAtServerCompletedAction
} from "./saga/handleCreator";

export interface InitialState {
    status: "initial" | "running" | "success" | "error";
    error?: string;
}

export function ProjectReducer(state: InitialState = { status: "initial" }, action: Action): InitialState {
    if (createAtServerStartedAction.is(action)) {
        return {
            ...state,
            status: "running",
            error: undefined
        };
    }

    if (createAtServerCompletedAction.is(action)) {
        return {
            ...state,
            status: action.status,
            error: action.error
        };
    }

    return state;
}
