import { FeatureModel } from "../../../shared/models/featuireModel";

export interface ResponseProjectModel {
    title: string;
    description: string;
    features: FeatureModel[];
}