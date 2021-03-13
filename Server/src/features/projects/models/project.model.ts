import { FeatureModel } from "./feature.model";

export interface ProjectModel {
    _id?: string | undefined;
    title: string;
    description: string;
    features: FeatureModel[];
}