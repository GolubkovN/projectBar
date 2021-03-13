import { FeatureModel } from "../..";
import { BaseResponseModel } from "../../../../shared/models";

export interface ResponseProjectModel extends BaseResponseModel {
    _id?: string;
    title: string;
    description: string;
    features?: FeatureModel[];
}