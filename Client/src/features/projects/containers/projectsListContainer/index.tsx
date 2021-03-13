import { AppState } from "app-state";
import { ProjectsListComponent } from "features/projects/components/projectsListComponent";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResponseProjectModel } from "shared/models";
import { deleteProjectAction, getAllProjectsAction } from "../../store/actions";

export function ProjectsListContainer(): JSX.Element {
    const dispatch = useDispatch();

    const [sortType, setSortType] = React.useState({sortType: "unset", page: 1});
    

    const changeSortType = (sort: string) => {
        setSortType({...sortType, sortType: sort})
    }
    
    
    const changePageNumber = (page: number) => {
        setSortType({...sortType, page})
        dispatch(getAllProjectsAction({request: {sortType: sortType.sortType, page}}));
    }
    
    useEffect(() => {
        dispatch(getAllProjectsAction({request: {sortType: sortType.sortType, page: sortType.page}}));
    }, [sortType, dispatch]);

    const projects: [ResponseProjectModel] = useSelector<AppState>((state) => state.projects.projects) as [ResponseProjectModel];
    
    const deleteHandler = useCallback(
        (_id: string | undefined) => {
            dispatch(deleteProjectAction({_id: _id}))
            dispatch(getAllProjectsAction({request: {sortType: sortType.sortType, page: sortType.page}}));
        },[dispatch, sortType.sortType, sortType.page]
    );

    return (
        <ProjectsListComponent changePageNumber={changePageNumber} changeSortType={changeSortType} projects={projects} onDelete={deleteHandler} />
    );
}
