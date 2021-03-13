import React from "react";
import ProjectsPrivateRoute from "./components/projectsPrivateRoute";
import { EditPage } from "./pages/editPage";
import { ProjectsPage } from "./pages/projectsPage";
import { PROJECTS_PAGE_URL, EDIT_PAGE_URL } from "./urls";


export const ProjectsRoutes = [
    <ProjectsPrivateRoute key="projects" path={PROJECTS_PAGE_URL.urlTemplate} render={ProjectsPage} />,
    <ProjectsPrivateRoute key="edit" path={EDIT_PAGE_URL.urlTemplate} render={EditPage} />,
] 