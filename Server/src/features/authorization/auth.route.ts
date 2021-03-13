//Vendors
import { Router } from "express";
import { ApiEndpointsConstants } from "../../config/api-endpoints.constants";

//Controllers
import * as authController from "./auth.controller";

export const authRouter: Router = Router();

authRouter.post(ApiEndpointsConstants.CREATE_USER, authController.createUser);
authRouter.post(ApiEndpointsConstants.LOGIN_USER, authController.loginUser);