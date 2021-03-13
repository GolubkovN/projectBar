import { connectRouter, routerMiddleware } from "connected-react-router";
import { UserReducer } from "features/authentication/store/reducer";
import { authSaga } from "features/authentication/store/saga";
import { createProjectSaga } from "features/CreateProject/store/saga";
import { ProjectsReducer } from "features/projects/store/reducer";
import { projectSaga } from "features/projects/store/saga";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { history } from "./history-instance";

//Reducers
const reducerMap = {
    router: connectRouter(history),
    user: UserReducer,
    project: ProjectsReducer,
    projects: ProjectsReducer
};
const reducers = combineReducers(reducerMap);

//Sagas
function* appSaga() {
    yield all([authSaga(), createProjectSaga(), projectSaga()]);
}
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

export const appStore = createStore(
    reducers,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

sagaMiddleware.run(appSaga);

type FirstArg<TFunction> = TFunction extends (arg: infer TArg, ...rest: any[]) => any ? TArg : any;
type State<TReducerMap> = {
    [P in keyof TReducerMap]: Exclude<FirstArg<TReducerMap[P]>, undefined>;
};

export type AppState = State<typeof reducerMap>;
