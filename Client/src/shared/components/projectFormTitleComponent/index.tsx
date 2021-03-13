import { getTotalprojectEstimate } from 'features/projects/helpers/ProjectFormHelper';
import { ResponseFeatureModel } from 'features/projects/models/response/responseFeature.model';
import { ResponseProjectModel } from 'shared/models/responseProject.model';
import React from 'react';
import {  CloudDownloadOutlined } from "@ant-design/icons";

interface ProjectFormTitleComponentProps {
    project: ResponseProjectModel;
    features: ResponseFeatureModel[];
    exportToPdfHandler: (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

function ProjectFormTitleComponent({project, features, exportToPdfHandler}: ProjectFormTitleComponentProps): JSX.Element {
    return (
        <div className="info-wrapper">
            <h1>{project.title}</h1>
            <a onClick={(evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => exportToPdfHandler(evt)} href="#" className="download"><CloudDownloadOutlined /> download pdf</a>
            <div className="total-estimate">
                Total: {getTotalprojectEstimate(features)}  hours
            </div>
        </div>
    );
};

export default React.memo(ProjectFormTitleComponent);