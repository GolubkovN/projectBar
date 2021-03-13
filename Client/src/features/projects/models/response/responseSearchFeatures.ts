import { ResponseFeatureModel } from "./responseFeature.model";

export interface ResponseSearchFeatures {
    _id: string;
    title: string;
    features: ResponseFeatureModel;
}