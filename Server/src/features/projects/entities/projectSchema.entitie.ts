import { model, Schema } from "mongoose";
import { Document } from 'mongoose';
import { FeatureModel } from "../models";
import { FeatureSchema } from "./featureSchema.entitie";

 interface ProjectModelSchema extends Document {
    title: string;
    description: string;
    features: FeatureModel[];
}

const ProjectSchema = new Schema<ProjectModelSchema>({
    title: {
        type: String,
        required: true
    },
    lowerCaseName: {
        type: String
    },
    description: {
        type: String,
        required: false
    },
    features: {
        type: [FeatureSchema],
        required: false
    },
});


export default model<ProjectModelSchema>("Project", ProjectSchema);