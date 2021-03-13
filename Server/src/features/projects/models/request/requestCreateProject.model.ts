import { FeatureModel } from "../feature.model";

export interface RequestCreateProjectModel {
    title: string;
    lowerCaseName: string;
    description: string;
    features: FeatureModel[];
} 
