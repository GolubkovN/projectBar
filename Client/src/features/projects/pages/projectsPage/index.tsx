import React from "react";
import {HomeLayout} from "../../../../layout/homeLayout";
import {HeaderContainer} from "../../../../shared/containers/headerContainer";
import {FooterContainer} from "../../../../shared/containers/footerContainer";
import "./index.scss";
import { ProjectsListContainer } from "features/projects/containers/projectsListContainer";

export function ProjectsPage() {
    return (
        <HomeLayout>
            <HeaderContainer />
            <div className="projects-container">
                <ProjectsListContainer/>
            </div>
            <FooterContainer />
        </HomeLayout>
    )
}