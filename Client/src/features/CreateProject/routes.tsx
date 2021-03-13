import React from "react";
import AuthPrivateRoute from "./authPrivateRoute";
import { CreateProjectPage } from "./pages/createProjectPage";
import { CREATE_PROJECT_URL } from "./urls";


export const HomeRoutes = [
    <AuthPrivateRoute key="home" path={CREATE_PROJECT_URL.urlTemplate} render={CreateProjectPage} />
] 