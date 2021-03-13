import { all } from "redux-saga/effects";
import { handleCreatorSaga } from "./handleCreator";

export function* createProjectSaga() {
    yield all([handleCreatorSaga()]);
}