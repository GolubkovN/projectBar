import { AxiosResponse } from "axios";
import { RequestProjectModel } from "features/CreateProject/models";
import { InitialState } from "features/projects/store/reducer";
import { defineAction } from "rd-redux-utils";
import { push } from "react-router-redux";
import { put, takeEvery } from "redux-saga/effects";
import { axiosApi } from "shared/servises/api";
import { API_SERVERS } from "../../../../config";
import { createAction } from "../actions";



export const createAtServerStartedAction = defineAction<InitialState>(
  "CREATE_AT_SERVER_STARTED"
);
export const createAtServerCompletedAction = defineAction<InitialState>(
  "CREATE_AT_SERVER_SUCCESS"
);

export function* handleCreatorSaga() {
  yield takeEvery(createAction.TYPE, function* (
    action: typeof createAction.typeOf.action
  ) {
    let CreatProjectFormModel: RequestProjectModel = action.payload;

    try {
      yield put(
        createAtServerStartedAction({
          status: "running",
        })
      );
      const response: AxiosResponse = yield axiosApi.post(
        `${API_SERVERS}/api/project/create`,
        CreatProjectFormModel
      );

      if (response.status === 200) {
        
        yield put(
            createAtServerCompletedAction({
            status: "success",
          })
        );

        yield put(push("/projects"));
      }
    } catch (e) {
      yield put(
        createAtServerCompletedAction({
          status: "error",
          error: e.toString(),
        })
      );
    }
  });
}