import { FeatureModel } from "../../../shared/models/featuireModel";

export interface RequestProjectModel {
    title: string;
    description?: string;
    features: FeatureModel[];
}