import React from "react";
import { AuthPage } from "./pages/registrPage";
import { LoginPage } from "./pages/loginPage";
import { REGISTR_PAGE_URL, LOGIN_PAGE_URL } from "./urls";
import PrivateRoute from "./components/privateRoute";


export const AuthRoutes = [
    <PrivateRoute key="registr" path={REGISTR_PAGE_URL.urlTemplate} render={AuthPage} />,
    <PrivateRoute key="login" path={LOGIN_PAGE_URL.urlTemplate} render={LoginPage} />,
] 