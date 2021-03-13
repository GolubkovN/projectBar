import { ResponseProjectModel } from "../projectModel/project.model.ts";

export interface ResponsePaginationModel {
    projects: ResponseProjectModel[]
    docsCount: number;
}