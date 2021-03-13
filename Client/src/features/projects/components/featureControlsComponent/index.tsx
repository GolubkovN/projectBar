import React, { FormEvent } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ModalComponent } from "../modalComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "app-state";
import { cleanAggregateFeaturesAction } from "features/projects/store/actions";
import { ResponseSearchFeatures } from "features/projects/models/response/responseSearchFeatures";
import {onlyUpdateForKeys} from "recompose";

interface FeatureControlProps {
    name: string;
    level: string;
    description: string;
    minEstimate: string | number;
    maxEstimate: string | number;
    onChangeFeatureField: (e: FormEvent<HTMLInputElement>, level: string) => void;
    subFeature: (parentLevel: string) => void;
    deleteFeature: (level: string) => void;
    onChange: (name: string) => void;
    pasteFeature: (level: string) => void;
    onModalFeatureClick: (_id: string, level: string, index: number, formFeatureLevel: string) => void;
    resetFeaturesHandler: () => void;
    index: number;
}

function FeatureControlsComponent(
    {
        name, 
        level, 
        description, 
        minEstimate, 
        maxEstimate, 
        index, 
        resetFeaturesHandler, 
        onModalFeatureClick, 
        subFeature, 
        deleteFeature, 
        pasteFeature, 
        onChangeFeatureField, 
        onChange
    }: FeatureControlProps
    ): JSX.Element {
    const dispatch = useDispatch();

    const cleanFeaturesHandler = () => dispatch(cleanAggregateFeaturesAction({features: null}));


    const aggregateFeatures: [ResponseSearchFeatures] = useSelector<AppState>((state) => state.projects.features) as [ResponseSearchFeatures];  

    const addSubFeatureHandler = (): void => {
        subFeature(level);
    }

    const deleteFeatureHandler = (): void => {
        deleteFeature(level);
    }

    const pasteFeatureHandler = (): void => {
        pasteFeature(level);
    }

    const [isOpen, setOpen] = React.useState<boolean>(false);

    const showModalHandler = (evt: React.KeyboardEvent<HTMLInputElement>): void => {
        if (evt.ctrlKey && evt.key === " ") {
            setOpen(true)
        }
    }

    const closeModalHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        evt.preventDefault();
        setOpen(false);
        cleanFeaturesHandler();
    }

    const escPresHandler = (evt: KeyboardEvent): void => {
        if(evt.key === "Escape") {
            setOpen(false);
            cleanFeaturesHandler();
        }
    }
    window.addEventListener("keydown", escPresHandler);

    const modalFeatureAddHandler = (_id: string, level: string, index: number, formFeatureLevel: string) => {
        onModalFeatureClick(_id, level, index, formFeatureLevel);
        setOpen(false);
        
        cleanFeaturesHandler();
        setTimeout(() => {
            resetFeaturesHandler();
        }, 300)
    };

    return (
        <div className="feature-info" >
            <div className="features-inputs">
                <input value={level} name="level" type="text" id="level" readOnly/>
                <input
                    value={name} 
                    required name="name" 
                    type="text" id="name" 
                    onChange={evt => (onChangeFeatureField(evt, level))} 
                    onKeyUp={(evt: React.KeyboardEvent<HTMLInputElement>) => showModalHandler(evt)} 
                />
                <input 
                    value={description} 
                    required 
                    name="feature-description" 
                    id="name" 
                    onChange={e => onChangeFeatureField(e, level)}
                />
                <input value={`${minEstimate}`} 
                    required 
                    name="minEstimate" 
                    type="number" 
                    id="minEstimate" 
                    onChange={evt => onChangeFeatureField(evt, level)} 
                />
                <input value={`${maxEstimate}`}
                    required 
                    name="maxEstimate" 
                    type="number" 
                    id="maxEstimate" 
                    onChange={evt => onChangeFeatureField(evt, level)} 
                />
            </div>
            <div className="features-controls">
                <Button onClick={addSubFeatureHandler} type="primary" shape="circle" >sub</Button>
                <Button onClick={pasteFeatureHandler} type="primary" shape="circle">+f</Button>
                <Button onClick={deleteFeatureHandler} className="red-bg" type="primary" shape="circle" icon={<DeleteOutlined />} />
            </div>
            <ModalComponent 
                index={index}
                formFeatureLevel={level}
                onModalFeatureClick={modalFeatureAddHandler} 
                aggregateFeatures={aggregateFeatures} 
                onChange={onChange} 
                value={name} 
                setClose={closeModalHandler} 
                open={isOpen} />
        </div> 
    );
};

export default onlyUpdateForKeys(
    [
        "name",
        "description", 
        "minEstimate", 
        "maxEstimate",
        "subFeature",

    ]
    )(FeatureControlsComponent);
