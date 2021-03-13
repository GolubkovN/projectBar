import { ProjectModel } from "../../features/projects/models/projectModel";

export interface ResponseProjectModel extends ProjectModel {
    _id?: string;
}