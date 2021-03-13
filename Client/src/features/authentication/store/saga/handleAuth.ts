/*-------------VENDORS-------------------*/
import axios, { AxiosResponse } from "axios";
import { defineAction } from "rd-redux-utils";
import { push } from "react-router-redux";
import { put, takeEvery } from "redux-saga/effects";
import { API_SERVERS } from "../../../../config";
/*-------------HELPERS-------------------*/
// import { MAIN_ASSET_URL } from "../../../home";
/*-------------MODELS-------------------*/
import { AuthModel } from "../../components/registrFormComponent";
import { LoginModel } from "../../components/loginComponent";
/*-------------ACTIONS-------------------*/
import { registrAction, loginAction, resetLoginDataAction } from "../actions";
/*-------------REDUCERS-------------------*/
import { InitialAppState } from "../reducer";

export const registrAtServerStartedAction = defineAction<InitialAppState>(
  "REGISTR_AT_SERVER_STARTED"
);
export const registrAtServerCompletedAction = defineAction<InitialAppState>(
  "REGISTR_AT_SERVER_SUCCESS"
);
export const loginAtServerStartedAction = defineAction<InitialAppState>(
  "LOGIN_SERVER_STARTED"
);
export const loginAtServerCompletedAction = defineAction<InitialAppState>(
  "LOGIN_SERVER_SUCCESS"
);

export function* handleRegistrSaga() {
  yield takeEvery(registrAction.TYPE, function* (
    action: typeof registrAction.typeOf.action
  ) {
    let AuthModel: AuthModel = action;
    
    try {
      yield put(
        registrAtServerStartedAction({
          status: "running",
        })
      );
      const response: AxiosResponse = yield axios.post(
        `${API_SERVERS}/api/auth/register`,
        AuthModel
      );

      if (response.status === 200) {
        
        yield put(
          registrAtServerCompletedAction({
            status: "success",
            loginData: {email: AuthModel.email, password: AuthModel.password}
          })
        );
  
        yield put(push("/login"));
      }
    } catch (e) {
      yield put(
        registrAtServerCompletedAction({
          status: "error",
          error: e.toString(),
        })
      );
    }
  });
}

export function* handleLoginSaga() {
  yield takeEvery(loginAction.TYPE, function* (
    action: typeof loginAction.typeOf.action
  ) {
    let LoginModel: LoginModel = action;

    try {
      yield put(
        loginAtServerStartedAction({
          status: "running"
        })
      );
      const response: AxiosResponse = yield axios.post(
        `${API_SERVERS}/api/auth/login`,
        LoginModel
      );

      if (response.status === 200) {
        localStorage.setItem("accessKey", response.data.accessToken)
        yield put(
          loginAtServerCompletedAction({
            status: "success",
          })
        );
        yield put(push("/projects"));
        yield put(resetLoginDataAction({loginData: null}))
      }
    } catch(e) {
      yield put(
        loginAtServerCompletedAction({
          status: "error",
          error: e.toString(),
          showNotice: true,
        })
      );
    }
  });
}