import React, { Fragment, useEffect } from "react";

import "./index.scss";
import { Pagination } from 'antd';
import { EmptyProjectsComponent } from "../emptyProjectsComponent";
import { ProjectCardComponent } from "../projectCardComponent";
import { SortingComponent } from "../sortingComponent";
import { useSelector } from "react-redux";
import { AppState } from "app-state";
import { ResponseFeatureModel } from "features/projects/models";
import { ResponseProjectModel } from "shared/models";

export interface ProjectModel {
    _id?: string;
    title: string;
    description: string;
    features: ResponseFeatureModel[];
}


interface ProjectsListComponentProps {
    projects: ResponseProjectModel[];
    onDelete: (_id: string | undefined) => void
    changePageNumber: (page: number) => void;
    changeSortType: (sortType: string) => void;
}

export function ProjectsListComponent({projects, onDelete, changePageNumber, changeSortType}: ProjectsListComponentProps): JSX.Element {  

    const [docsCount, setDocsCount] = React.useState(0);

    const projectsCount: number = useSelector<AppState>((state) => state.projects.projectsCount) as number;

    useEffect(() => {
        setDocsCount(projectsCount);
    }, [projectsCount]);
    
    
    return (
        <Fragment>
            {
                projects.length === 0
                    ? <EmptyProjectsComponent />
                    : <div className="project-list__wrapper">
                        <div className="projects-list__ontrolls">
                            <SortingComponent changeSortType={changeSortType} />
                        </div>
                        <div className="projects">
                        {
                            projects.map((project: ResponseProjectModel) => (
                                    <ProjectCardComponent key={project._id} project={project} onDelete={onDelete} />
                            ))
                        }
                        </div>

                        <div className="pagination">
                            <Pagination onChange={(evt: any) => changePageNumber(evt)} defaultCurrent={1} total={docsCount} />
                        </div> 
                    </div>
            }
        </Fragment>
    )
}