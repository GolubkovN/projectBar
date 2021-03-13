import { object, string, array } from "yup";
import { ProjectModel } from "../models/project.model";

export const ProjectRequestSchema = object<ProjectModel>().shape(
    {
        title: string().required(),
        description: string(),
        features: array(),
    }
);