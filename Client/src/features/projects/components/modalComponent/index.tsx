import React, { FormEvent } from "react";
import { ArrowUpOutlined, PlusCircleOutlined } from "@ant-design/icons";

import "./index.scss";
import { Button } from "antd";
import { ResponseSearchFeatures } from "features/projects/models";

interface ModalProps {
    open: boolean;
    setClose: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    value: string;
    onChange: (name: string) => void;
    aggregateFeatures: ResponseSearchFeatures[];
    onModalFeatureClick: (_id: string, level: string, index: number, formFeatureLevel:string) => void;
    index: number;
    formFeatureLevel: string;
}

export function ModalComponent({aggregateFeatures, index, formFeatureLevel, onModalFeatureClick, open, setClose, value, onChange}: ModalProps): JSX.Element { 
    const onChangeHandler = (evt: FormEvent<HTMLInputElement>) => {
        onChange(evt.currentTarget.value as string);
    }

    const [features, setFeatures] = React.useState<ResponseSearchFeatures[]>([]);

    React.useEffect(() => {
        setFeatures(aggregateFeatures)
    },[aggregateFeatures])

    
    

    return (
        <section className={open ? `modal open` : `modal`}>
            <div className="modal__content">
                <div className="modal__controls">
                    <input onChange={(evt: FormEvent<HTMLInputElement>) => onChangeHandler(evt)} 
                        defaultValue={value} type="text" 
                        placeholder="Enter the name of the feature"
                    />
                </div>

                <div className="modal__dropdown">
                    <ul className="modal__list" >
                        {
                            features
                                ? (features).map(({_id, title, features}, i) => (
                                    <li className="modal__item" key={`item-${i}`} >
                                            <h3>{title}</h3>
                                            <div className="modal__group">
                                                <div className="modal__text">
                                                    <span>{features.name}</span>
                                                    <span>{features.featureDescription}</span>
                                                    <span>min: {features.minEstimate}</span>
                                                    <span>max: {features.maxEstimate}</span>
                                                </div>
                                                <div className="modal__add">
                                                    <Button onClick={() => onModalFeatureClick(_id, features.level, index, formFeatureLevel)} type="primary" shape="circle" icon={<PlusCircleOutlined />} />
                                                </div>
                                            </div>
                                    </li>
                                ))
                                
                                : <li className="modal__item prompting" ><p>start typing a feature name in the field...</p></li>
                        }
                    </ul>
                </div>
            </div>
            <button onClick={setClose} type="button" className="close-btn"><ArrowUpOutlined /></button>
        </section> 
    );
};