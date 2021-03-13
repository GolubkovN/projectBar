import { all } from "redux-saga/effects";
import { handleLoginSaga, handleRegistrSaga } from "./handleAuth";

export function* authSaga() {
    yield all([handleRegistrSaga(), handleLoginSaga()]);
}