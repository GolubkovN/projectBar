import { FeatureModel } from "./featuireModel";

export interface CreateFormModel {
    title: string;
    description?: string;
    features?: FeatureModel[]
  }
  