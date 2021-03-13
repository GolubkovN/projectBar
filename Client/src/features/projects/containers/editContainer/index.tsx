import { AppState } from "app-state";
import { ProjectModel } from "features/projects/models";
import { getOneProjectAction, updateProjectAction } from "features/projects/store/actions";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { LoadSpinner } from "shared/components/loadSpinner";
import ProjectFormComponent from "shared/components/ProjectFormComponent";
import { ResponseProjectModel } from "shared/models";


export const EditContainer: React.FC = (): JSX.Element => {
    const location = useLocation();
    const dispatch = useDispatch();
    const _id = location.pathname.slice(9);

    React.useEffect(() => {
        dispatch(getOneProjectAction({ _id }))
    }, [dispatch, _id]);

    const project: ResponseProjectModel = useSelector<AppState>((state) => state.projects.project) as ResponseProjectModel;    

    const updateHandler = (EditModel: ProjectModel) => {
            dispatch(updateProjectAction({ payload: EditModel }))
        }

        

    return (
        <Fragment>
            {project && project._id === _id 
                ? <ProjectFormComponent 
                    project={project} 
                    onChange={({ title, description, features }: ProjectModel) => {
                        
                        updateHandler({ title, description, _id: project._id, features })
                    }} 
                    value={{
                        title: project.title,
                        description: project.description,
                        features: project.features
                    }} />
                : <LoadSpinner />
                }
        </Fragment>
    );
}


