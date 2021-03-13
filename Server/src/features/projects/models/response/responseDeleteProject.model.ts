import { FeatureModel } from "..";

export interface ResponseDeleteProjectModel {
    title: string;
    description: string;
    features?: FeatureModel[];
}