import { ResponseProjectModel } from "../projectModel/project.model.ts";

export interface RequestDeleteProjectModel extends ResponseProjectModel{
    _id: string;
}