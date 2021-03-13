import React, { useState } from "react";
import {Button} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import { compareFeatures, getTotalprojectEstimate } from "features/projects/helpers/ProjectFormHelper";
import { ResponseProjectModel } from "shared/models";
import { ResponseFeatureModel } from "features/projects/models";



interface ProjectCardProps {
    project: ResponseProjectModel;
    onDelete: (_id: string | undefined) => void;
}

export function ProjectCardComponent({project, onDelete}: ProjectCardProps): JSX.Element {
    
    const {title, _id, features} = project;
    const history = useHistory();

    const deleteHandler = (): void => {
        onDelete(_id);
    }

    const editHandler = (): void => {
        history.push(`/project/${_id}`)
    }

    const [isOpen, setIsOpen] = useState(false);

    const dropdowmHandler = (): void => {
        setIsOpen(!isOpen);
    }

    return (
        <article className="projects__card">
            <h4 className="projects__title">{title}</h4>

            { features && <div className="features-dropdown">
                <div onClick={dropdowmHandler} className="feature-tagline">
                    <span>Features</span>
                    <button className={isOpen ? `open` : ""}></button>
                </div>
                <ul className={isOpen ? `features-list open` : `features-list`}>
                    {
                        compareFeatures(features).map((item: ResponseFeatureModel, i) => (
                            <li key={`item${i}`}>
                                <span className="feature-level">{item.level}</span>
                                <span className="feature-name">{item.name}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>}
            <div className="">
                <p className="projects__estimate">Estimate: {getTotalprojectEstimate(features)}-h</p>
                <div className="projects__controls">
                    <Button onClick={editHandler} type="primary" shape="circle" icon={<EditOutlined />}></Button>
                    <Button onClick={deleteHandler} type="primary" shape="circle" icon={<DeleteOutlined />}></Button>
                </div>
            </div>
        </article>
    )
}