import { ResponseProjectModel } from "../projectModel/project.model.ts";

export interface ResponseUpdateProjectModel extends ResponseProjectModel {
    _id?: string
}