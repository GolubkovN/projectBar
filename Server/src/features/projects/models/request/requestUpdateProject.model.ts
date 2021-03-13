import { ResponseProjectModel } from "../projectModel/project.model.ts";

export interface RequestUpdateProjectModel extends ResponseProjectModel{
    _id: string;
}