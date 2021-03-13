import { defineAction } from "rd-redux-utils";
import { RequestProjectModel } from "../models/requestProjectModel";


export const createAction = defineAction<{payload: RequestProjectModel}>("CREATE")