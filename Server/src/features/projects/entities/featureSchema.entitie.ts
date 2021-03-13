import { model, Schema } from "mongoose";
import { Document } from 'mongoose';

interface FeatureModelSchema extends Document{
    name: string;
    featureDescription: string;
    level: string;
    minEstimate: number;
    maxEstimate: number;
}

export const FeatureSchema = new Schema<FeatureModelSchema> ({
    name: {
        type: String,
        required: true
    },
    featureDescription: {
        type: String,
        required: false
    },
    level: {
        type: String,
        required: true
    },
    minEstimate: {
        type: Number,
        required: true,
    },
    maxEstimate: {
        type: Number,
        required: true,
    }
});

export default model<FeatureModelSchema>("feature", FeatureSchema);