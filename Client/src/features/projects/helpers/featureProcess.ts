import { FeatureModel } from "shared/models/featuireModel";
import { checkLevel, decrementMidleLevel, descrementBegineLevel, getItemIndexByLevel } from "./ProjectFormHelper";


// add feature from modale
export const combineFeatures = (state: FeatureModel[], index: number, modalFeatures: FeatureModel[]): Array<FeatureModel> => {
    if(index === state.length - 1) {
        return [...state.slice(0, state.length - 1), ...modalFeatures];
    }

    return [
        ...state.slice(0, index),
        ...modalFeatures,
        ...state.slice(index + 1, state.length)
    ]
}

export const changeFeatureFromModalLevel = (features: FeatureModel[], level: string) => {
    return features?.map((item, i) => {
        if(i === 0) {
            return {...item, level}
        }

        let levelSymbols = item.level.slice(features[0].level.length - item.level.length);
        return {...item, level: `${level}${levelSymbols}`}
    })

};

// add feature anywhere
export const pasteNewFeature = (prevLevel: string, features: FeatureModel[]): FeatureModel[] => {
    const curentTargetIndex = getItemIndexByLevel(features, prevLevel);

    if (!prevLevel.includes('.')) {        
        let newFeatures: FeatureModel[] = []

        let prevNodes: FeatureModel[] = [];
        
        for (let i = 0; i <= curentTargetIndex; i++) {
            prevNodes.push(features[i]);
        }

        features.every(f => {
            if (f.level.includes('.') && f.level.slice(0, prevLevel.length) === prevLevel && f.level !== prevLevel) {
                prevNodes.push(f);
            }
            return true;
        })

        const lastIndex = features.findIndex(f => f.level === prevNodes[prevNodes.length - 1].level)

        newFeatures = [...prevNodes];
        const addedfeature: FeatureModel = {
            level: (parseInt(features[curentTargetIndex].level) + 1).toString(),
            name: "",
            featureDescription: "",
            minEstimate: 0,
            maxEstimate: 0
        }
        newFeatures = [...newFeatures, addedfeature];


        let updatedLevels: FeatureModel[] = [];

        for (let i = lastIndex + 1; i < features.length; i++) {
            updatedLevels.push(features[i]);
        }

        const newUpdatedLevels = updatedLevels.map(item => {
            if (!item.level.includes('.')) {
                let newLevel = parseInt(item.level) + 1;
                return { ...item, level: `${newLevel}` }
            } else {
                let newLevel = parseInt(item.level) + 1;
                let dotIndex = item.level.indexOf('.');
                return { ...item, level: `${newLevel}${item.level.slice(dotIndex)}` }
            }
        });

        newFeatures = [...newFeatures, ...newUpdatedLevels];

        return newFeatures;
    }
        let prevFeatures: FeatureModel[] = [];
        let newFeatures: FeatureModel[] = [];

        for (let i = 0; i <= curentTargetIndex; i++) {
            prevFeatures.push(features[i]);
        }

        features.every(item => {
            if (item.level.slice(0, prevLevel.length) === prevLevel && item.level[prevLevel.length] === '.') {
                prevFeatures.push(item);
            }
            return true;
        })

        let newLvl = parseInt(prevLevel[prevLevel.length - 1]) + 1;
        const addedsubfeature: FeatureModel = {
            level: `${prevLevel.slice(0, prevLevel.length - 1)}${newLvl}`,
            name: "",
            featureDescription: "",
            minEstimate: 0,
            maxEstimate: 0
        }
        newFeatures = [...prevFeatures, addedsubfeature as FeatureModel];

        const indexFromUpdate = getItemIndexByLevel(features, prevFeatures[prevFeatures.length - 1].level);

        let featuresToUpdate: FeatureModel[] = [];

        for (let i = indexFromUpdate + 1; i < features.length; i++) {
            if (features[i].level.slice(0, prevLevel.length - 2) === prevLevel.slice(0, prevLevel.length - 2)) {
                featuresToUpdate.push(features[i]);
            } else {
                break;
            }
        }


        if(!featuresToUpdate[featuresToUpdate.length - 1]) {
            return features;
        }

        const firstIndOfRest = getItemIndexByLevel(features, featuresToUpdate[featuresToUpdate.length - 1].level);

        

        featuresToUpdate = featuresToUpdate.map(node => {
            let ind = prevLevel.lastIndexOf('.');
            let childInd = node.level.indexOf('.', ind + 1);
            
            
            if (childInd > 0) {
                let newLevel = parseInt(node.level[prevLevel.length - 1]) + 1;
                return { ...node, level: `${node.level.slice(0, ind + 1)}${newLevel}${node.level.slice(childInd)}` }
            } else {
                let newLevel = parseInt(node.level.slice(ind + 1)) + 1;
                return { ...node, level: `${node.level.slice(0, ind + 1)}${newLevel}` }
            }
        });

        let restNodes: FeatureModel[] = [];

        for (let i = firstIndOfRest + 1; i < features.length; i++) {
            restNodes.push(features[i]);
        };
        
        newFeatures = [...newFeatures, ...featuresToUpdate, ...restNodes];


        return newFeatures;
};



// subFeature Level
export const getSubLevel = (parentLevel: string, features: FeatureModel[]) => {
    let newChildLevel = 0;
    const levelCount = parentLevel.length;
    const items: FeatureModel[] = [];
    
    features.every(feature => {
        if ((feature.level.slice(0, levelCount)) === parentLevel) {
            items.push(feature);
        }
        return true;
    });

    if (items.length === 1) {
        return `${parentLevel}.1`;
    }

    items.forEach(item => {
        if (parseInt(item.level.slice(levelCount + 1)) > newChildLevel) {
            newChildLevel = parseInt(item.level.slice(levelCount + 1, item.level.length));
        }
    });

    return `${parentLevel}.${(newChildLevel + 1)}`;
};


//feature level
export const getMainLevel = (features: FeatureModel[]): string => {
    if (features.length === 0) {
        return "1";
    }
    let lastLevel = 0;
    features.forEach((item) => {
        if (parseInt(item.level) > lastLevel) {
            lastLevel = parseInt(item.level)
        }
    });

    return (lastLevel + 1).toString();
};

export const deleteFeature = (level: string, state: FeatureModel[], setState: (arr: FeatureModel[]) => void) => {
    const regExForFilter = checkLevel(level)
    let needIndex: number;
    let filteredFeatures = state.filter((item, _index, arr) => {
        const findNeededIndex = getItemIndexByLevel(arr, level);
        needIndex = findNeededIndex;

        return !(item.level.split(".")[0] === level.split(".")[0] && regExForFilter.test(item.level));
    });

    if(!level.includes(".")) {
        const changedFeatures = filteredFeatures.map((item, index) => {
            if(index >= needIndex) {
                const decrementedLevel = descrementBegineLevel(item.level);
                return {...item, level: decrementedLevel}
            }

            return item;
        })
        return setState(changedFeatures);
    };

    if(level.includes(".")) {
        const changedFeatures = filteredFeatures.map((item, index) => {
            if(index >= needIndex) {
                const decrementLevel = decrementMidleLevel(item.level, level);
                return {...item, level: decrementLevel};
             }
             return item;
        })
        return setState(changedFeatures);
    }
};