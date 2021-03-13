import axios, { AxiosResponse } from "axios";
import { push } from "connected-react-router";

import { defineAction } from "rd-redux-utils";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { API_SERVERS } from "../../../../config";

import { 
  addFeaturesFromModalAction,
  deleteProjectAction, 
  getAggregateFeatures,
  getAllProjectsAction, 
  getOneProjectAction, 
  updateProjectAction 
} from "../actions";

import { InitialState } from "../reducer";
import { ResponseSearchFeatures } from "features/projects/models/response/responseSearchFeatures";

import { axiosApi } from "../../../../shared/servises/api";
import { ProjectIdResponseModel, ProjectModel, ResponseFeatureModel } from "features/projects/models";

export const getAtServerStartedAction = defineAction<InitialState>(
  "GET_AT_SERVER_STARTED"
);
export const getAtServerCompletedAction = defineAction<InitialState>(
  "GET_AT_SERVER_SUCCESS"
);

export const deleteAtServerStartedAction = defineAction<InitialState>(
  "DELETE_AT_SERVER_STARTED"
);
export const deleteAtServerCompletedAction = defineAction<InitialState>(
  "DELETE_AT_SERVER_SUCCESS"
);

export const getOneProjectStarteedAction = defineAction<InitialState>(
  "GET_ONE_PROJECT_STARTED"
)
export const getOneProjectCompletedAction = defineAction<InitialState>(
  "GET_ONE_PROJECT_SUCCES"
)

export const updateProjectStartedAction = defineAction<InitialState>(
  "UPDATE_PROJECT_STARTED"
)
export const updateProjectCompletedAction = defineAction<InitialState>(
  "UPDATE_PROJECT_SUCCESS"
)

export const aggregateFeaturesStartedAction = defineAction<InitialState>(
  "AGGREGATE_FEATURES_STARTED"
)
export const aggregateFeaturesCompletedAction = defineAction<InitialState>(
  "AGGREGATE_FEATURES_SUCCESS"
)

export const getFeaturesFromModalStarted = defineAction<InitialState>(
  "GET_FEATURES_START"
)

export const getFeaturesFromModalCompleted = defineAction<InitialState>(
  "GET_FEATURES_SUCCESS"
)

// get all projects
export function* handleGetProjectsSaga() {
  yield takeEvery(getAllProjectsAction.TYPE, function* (
    action: typeof getAllProjectsAction.typeOf.action
  ) {

    let request = action;
 
    try {
      yield put(
        getAtServerStartedAction({
          status: "running",
        })
      );
      const response: AxiosResponse = yield axiosApi.post(
        `${API_SERVERS}/api/project/get`,
        request.request,
      );
      

      if (response.status === 200 || response.status === 304) {   
        yield put(
            getAtServerCompletedAction({
            status: "success",
            projects: response.data.projects,
            projectsCount: response.data.docsCount
          })
        );
      }
    } catch (e) {
      yield put(
        getAtServerCompletedAction({
          status: "error",
          error: e.toString(),
        })
      );
    }
  });
}

//delete project
export function* handleDeleteProjectSaga() {
  yield takeEvery(deleteProjectAction.TYPE, function* (
    action: typeof deleteProjectAction.typeOf.action
  ) {
    let _id: ProjectIdResponseModel = action;
    try {
      yield put(
        deleteAtServerStartedAction({
          status: "running",
        })
      );
      const response: AxiosResponse = yield axios.delete(
        `${API_SERVERS}/api/project/delete`,
        {data: _id}
      );

      if (response.status === 200) {      
        yield put(
          deleteAtServerCompletedAction({
            status: "success",
          })
        );

      }
    } catch (e) {
      yield put(
        deleteAtServerCompletedAction({
          status: "error",
          error: e.toString(),
        })
      );
    }
  });
}

// update
export function* handleUpdateProjectSaga() {
  yield takeEvery(updateProjectAction.TYPE, function* (
    action: typeof updateProjectAction.typeOf.action
  ) {
    let data: ProjectModel  = action.payload
    let {_id} = data

    try {
      yield put(
        updateProjectStartedAction({
          status: "running",
        })
      );

      const response: AxiosResponse = yield axiosApi.put(
        `${API_SERVERS}/api/project/update`,
          data 
      );

      if (response.status === 200) {

        yield put(
          updateProjectCompletedAction({
            status: "success",
          })
        );
        yield put(getOneProjectAction({_id}))
        yield put(push("/projects"));

      }
    } catch(err) {
      updateProjectCompletedAction({
        status: "error",
        error: err.toString(),
      })
    }
  });
}


// get one
export function* handleGetOneProjectSaga() {
  yield takeEvery(getOneProjectAction.TYPE, function* (
    action: typeof getOneProjectAction.typeOf.action
  ) {
    let id = action._id;

    
    try {
      yield put(
        getOneProjectStarteedAction({
          status: "running",
        })
      );
      const response: AxiosResponse = yield axiosApi.get(
        `${API_SERVERS}/api/project/getOne/?_id=${id}`,
      );

      if (response.status === 200) {      
        
        yield put(
          getOneProjectCompletedAction({
            status: "success",
            project: response.data
          })
        );

      }
    } catch (e) {
      yield put(
        getOneProjectCompletedAction({
          status: "error",
          error: e.toString(),
        })
      );
    }
  });
}

// aggregate features
export function* aggregateFeaturesSaga() {
  yield takeLatest(getAggregateFeatures.TYPE, function* (
    action: typeof getAggregateFeatures.typeOf.action
  ) {
    let name = action; 
    
    try {
      yield put(
        aggregateFeaturesStartedAction({
          status: "running",
        })
      );
      const response: AxiosResponse<ResponseSearchFeatures[]> = yield axios.get(
        `${API_SERVERS}/api/project/aggregate/?name=${name.name}`,
      );

      if (response.status === 200) {                        
        yield put(
          aggregateFeaturesCompletedAction({
            status: "success",
            features: response.data
          })
          
        );

      }
    } catch (e) {
      yield put(
        aggregateFeaturesCompletedAction({
          status: "error",
          error: e.toString(),
        })
      );
    }
  });
}

export function* getFeaturesFromModalSaga() {
  yield takeEvery(addFeaturesFromModalAction.TYPE, function* (
    action: typeof addFeaturesFromModalAction.typeOf.action
  ) {
    let _id = action._id;
    let level = action.level;
    let index = action.index;
    let formFeatureLevel = action.formFeatureLevel;

    try {
      yield put(
        getFeaturesFromModalStarted({
        status: "running",
        })
      );

      const response: AxiosResponse<ResponseFeatureModel[]> =  yield axios.get(
        `${API_SERVERS}/api/project/features/?_id=${_id}&level=${level}`,
      )

      if (response.status === 200) {        
        yield put(
          getFeaturesFromModalCompleted({
            status: "success",
            modalFeatures: response.data,
            featureIndex: index,
            featureLevel: formFeatureLevel,
          })
        );
      }
    }catch (e) {
      yield put(
        getFeaturesFromModalCompleted({
          status: "error",
          error: e.toString(),
        })
      );
    }
  });
}