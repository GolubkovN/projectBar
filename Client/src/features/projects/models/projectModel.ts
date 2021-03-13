import { FeatureModel } from "shared/models/featuireModel";

export interface ProjectModel {
    _id?: string;
    title: string;
    description: string;
    features: FeatureModel[];
}