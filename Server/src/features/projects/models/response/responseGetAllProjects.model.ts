import { FeatureModel } from "../feature.model";

export interface ResponseGetAllProjectsModel {
    _id: string;
    title: string;
    description: string;
    features?: FeatureModel[];
}