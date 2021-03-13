import React, { FormEvent, useCallback } from "react";
import ReactMde from "react-mde";
import { jsPDF } from "jspdf";
import "react-mde/lib/styles/css/react-mde-all.css";
import {Button} from "antd";
import { 
    PlusCircleOutlined, 
    SaveFilled, 
    SettingOutlined 
} from "@ant-design/icons";
import { Form, Input } from "antd";
import { FeatureModel } from "shared/models/featuireModel";
import { ProjectModel } from "features/projects/models/projectModel";
import FeatureControlsComponent  from "features/projects/components/featureControlsComponent";
import { 
    compareFeatures, 
    debounce, 
    getTotalprojectEstimate, 
    onChangeFeatureField
} from "features/projects/helpers/ProjectFormHelper";
import { addFeaturesFromModalAction, getAggregateFeatures, resetModalFeaturesAction } from "features/projects/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { 
    changeFeatureFromModalLevel, 
    combineFeatures, 
    deleteFeature, 
    getMainLevel, 
    getSubLevel, 
    pasteNewFeature 
} from "features/projects/helpers/featureProcess";
import {onlyUpdateForKeys} from "recompose";
import "./index.scss";
import { ResponseFeatureModel } from "features/projects/models/response/responseFeature.model";
import { AppState } from "app-state";
import ProjectFormTitleComponent from "../projectFormTitleComponent";
let Showdown = require("showdown");

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

export interface EditFormModel {
    title: string;
    description?: string;
    features: FeatureModel[];
}


interface EditPageProps {
    value: EditFormModel;
    loading?: boolean;
    onChange: (FormModel: ProjectModel) => void;
    isCreateForm?: boolean;
    project: ProjectModel;
}


function ProjectFormComponent({ project, value, isCreateForm = false, loading, onChange}: EditPageProps): JSX.Element {

    const resetFeaturesHandler = () => dispatch(resetModalFeaturesAction({modalFeatures: null}));
    // constats
    const dispatch = useDispatch();
    const featuresFromModal: [ResponseFeatureModel] = useSelector<AppState>((state) => state.projects.modalFeatures) as [ResponseFeatureModel];
    const featureIndex: number = useSelector<AppState>((state) => state.projects.featureIndex) as number;
    const featureLevel: string = useSelector<AppState>((state) => state.projects.featureLevel) as string;
    
    const featuresForPdf = project.features.map((item) => {
        const {minEstimate, maxEstimate} = item;    
        const stringMinEstimate = minEstimate.toString();
        const stringMaxEstimate = maxEstimate.toString();
        return {...item, minEstimate: stringMinEstimate, maxEstimate: stringMaxEstimate}
    })
    
    // local state
    const [values, setValues] = React.useState({title: "", description: ""});
    const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">("write");
    const [forceState, forceStateUpdate] = React.useState<number>(1);
    const [featureState, setFeatureState] = React.useState<Array<FeatureModel>>(project.features);

    const featureChangeHandler = React.useCallback((e: FormEvent<HTMLInputElement>, level: string) => {
        onChangeFeatureField(e, level, forceStateUpdate, featureState, forceState);
    }, [featureState, forceState]);


    // submit
   const saveProject = useCallback(() => {
    const element: ProjectModel = {...values, features: featureState};
    onChange(element);
    resetFeaturesHandler();
   }, [values, onChange, featureState]);

   // project values
   React.useEffect(() => {
    if(value.title) {
        setValues({title: value.title, description: value.description as string})
    };

   }, [value]);

    // features
    React.useEffect(() => {
        if(featuresFromModal) {
            const chengedFeaturesFromModal = changeFeatureFromModalLevel(featuresFromModal, featureLevel);
            const newArray = combineFeatures(featureState, featureIndex, chengedFeaturesFromModal);
            const sortedArray = compareFeatures(newArray);
            
            setFeatureState(sortedArray);
        }
    },[featuresFromModal]);

    // handlers
    const deleteFeatureHandler = React.useCallback((level: string) => {
        deleteFeature(level, featureState, setFeatureState);
    }, [featureState])

    const pasteNewFeatureHandler = (level: string) => {
        const sortedFeatures = compareFeatures(featureState)
        setFeatureState(pasteNewFeature(level, sortedFeatures))
    }

    const addFeatureHandler = (): void => {
        const addedfeature: FeatureModel = {
            level: getMainLevel(featureState),
            name: "",
            featureDescription: "",
            minEstimate: 0,
            maxEstimate: 0
        }

        const newArray = [...featureState, addedfeature]
        const sortedArray = compareFeatures(newArray)

        setFeatureState(sortedArray)
    };
    
    const addSubFeatureHandler = (parentLevel: string): void => {

        const addedfeature: FeatureModel = {
            level: getSubLevel(parentLevel, featureState),
            name: "",
            featureDescription: "",
            minEstimate: 0,
            maxEstimate: 0
        }
        const newArray = [...featureState, addedfeature]
        const sortedArray = compareFeatures(newArray)        

        setFeatureState(sortedArray);
    };

    function aggregate(name: string) {
        dispatch(getAggregateFeatures({name: name}));
    };
    const searchHandler = debounce(aggregate, 100);

    const addFeaturesFromModalHandler = (_id: string, level: string, index: number, formFeatureLevel: string) => {
        dispatch(addFeaturesFromModalAction({_id, level, index, formFeatureLevel}));
    };

    const exportToPdfHandler = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const description = converter.makeHtml(value.description as string);
        
        evt.preventDefault();
        const doc = new jsPDF();
        doc.setFont("Roboto");
        doc.text(`Project: ${value.title.toUpperCase()}`, 25, 30);
        doc.setFont("Roboto");
        doc.text(`Total Estimate: ${getTotalprojectEstimate(project.features)} hourse`, 120, 30);
        let headers = [
            "level",
            "name",
            "featureDescription",
            "minEstimate",
            "maxEstimate"
        ];
        doc.table(25, 65, featuresForPdf, headers, {autoSize: true});
        doc.html(`<div style="font-size: 5px; width: 200px;">${description}</div>`, {
            callback: function(doc) {
                doc.save(`${value.title}`)
            },
            x: 25,
            y: 40
        });
    };
    
    return (
            <div className="project-edit">

                {
                    !isCreateForm && <ProjectFormTitleComponent exportToPdfHandler={exportToPdfHandler} project={project} features={featureState} />
                }

                    <Form className="edit" onSubmitCapture={() => saveProject()}>
                        {isCreateForm && <h2>Create your project</h2>}
                        <h3>Project</h3>
                        <div className="edit-form__header">
                            <Input value={values.title} 
                                onChange={evt => setValues({...values, title: evt.target.value})} 
                                className="adit-form__title"
                                name="title" id="title" 
                                type="text" 
                                placeholder="project name" 
                            />
                            <ReactMde
                                value={values.description}
                                onChange={v => setValues({...values, description: v,})}
                                selectedTab={selectedTab}
                                onTabChange={setSelectedTab}
                                generateMarkdownPreview={markdown =>
                                Promise.resolve(converter.makeHtml(markdown))}
                            />
                        </div>

                        <div className="features-area">
                            <h3>Features</h3>
                            <div className="features-add-btn">
                                <Button className="add-btn" onClick={addFeatureHandler} type="primary" icon={<PlusCircleOutlined />}>
                                    Add feature
                                </Button>
                            </div>
                            {
                                featureState.map((item: FeatureModel, i) => (
                                    <FeatureControlsComponent 
                                        index={i}
                                        resetFeaturesHandler={resetFeaturesHandler}
                                        onModalFeatureClick={addFeaturesFromModalHandler} 
                                        onChange={searchHandler} 
                                        pasteFeature={pasteNewFeatureHandler}
                                        deleteFeature={deleteFeatureHandler} 
                                        subFeature={addSubFeatureHandler}
                                        level={item.level}
                                        key={`item${i}`} 
                                        name={item.name}
                                        description={item.featureDescription}
                                        minEstimate={item.minEstimate}
                                        maxEstimate={item.maxEstimate}
                                        onChangeFeatureField={featureChangeHandler}/>
                                )) 
                            }
                        </div>

                        <div className="submit-block">
                            {
                                !isCreateForm 
                                    ? <Button className="save-btn" htmlType="submit" type="primary" shape="round" icon={<SaveFilled />}>SAVE</Button>
                                    : <Button className="submit-btn" type="primary" shape="round" htmlType="submit" disabled={loading} icon={<SettingOutlined />} size="large">
                                        Create
                                     </Button>
                            }
                        </div>
                    </Form>

            </div>
    )
}

export default onlyUpdateForKeys(["value"])(ProjectFormComponent);
