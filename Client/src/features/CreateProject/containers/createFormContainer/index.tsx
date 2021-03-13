import { AppState } from "app-state";
import { createAction } from "features/CreateProject/store/actions";
import ProjectFormComponent from "shared/components/ProjectFormComponent";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FeatureModel, ResponseProjectModel } from "shared/models";


interface CreatorFormModel {
  title: string;
  description?: string;
  features: FeatureModel[];
}

const initialPriject: ResponseProjectModel = {
  _id: "",
  title: "",
  description: "",
  features: []
}

export function CreateFormContainer(): JSX.Element {
  const dispatch = useDispatch();

  const createHandler = (CreateFormModel: CreatorFormModel) => {
    dispatch(createAction({payload: CreateFormModel}))
  }

  const loading = useSelector<AppState, boolean>((state): boolean => {
    return state.project.status === "running";
  });

  return (
    <ProjectFormComponent
      project={initialPriject}
      value={{
        title: "",
        description: "",
        features: []
      }}
      isCreateForm={true}
      loading={loading}
      onChange={createHandler}
    />
  );
}