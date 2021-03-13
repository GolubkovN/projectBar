import React from "react";
import { Redirect } from "react-router";
import { AuthRoutes } from "./features/authentication/routes";
import { ProjectsRoutes } from "features/projects/routes";
import { HomeRoutes } from "features/CreateProject/routes";

export const AppRoutes = [
  ...AuthRoutes,
  ...HomeRoutes,
  ...ProjectsRoutes,
  <Redirect
    key="main-home-page"
    from="/"
    to="/login"
  />,
];
