import { defineAction } from "rd-redux-utils";
import { AuthModel } from "../components/registrFormComponent";
import { LoginModel } from "../components/loginComponent";

export const registrAction = defineAction<AuthModel>("REGISTR")
export const loginAction = defineAction<LoginModel>("LOGIN")
export const resetLoginDataAction = defineAction<{loginData: null}>("RESET_LOGIN");
