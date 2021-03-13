import { all } from "redux-saga/effects";
import { 
    aggregateFeaturesSaga,
    getFeaturesFromModalSaga,
    handleDeleteProjectSaga, 
    handleGetOneProjectSaga, 
    handleGetProjectsSaga, 
    handleUpdateProjectSaga 
} from "./handleProjects";

export function* projectSaga() {
    yield all(
        [handleGetProjectsSaga(), 
        handleDeleteProjectSaga(),
        handleGetOneProjectSaga(), 
        handleUpdateProjectSaga(), 
        aggregateFeaturesSaga(),
        getFeaturesFromModalSaga(),
    ]);
}