import { FormEvent } from "react";
import { FeatureModel } from "shared/models/featuireModel";

// culculate total estimate
export const getTotalprojectEstimate = (features: FeatureModel[]) => {
    return features.reduce((total, feature) => total + (+feature.maxEstimate), 0);
};

// find index in features array
export const getItemIndexByLevel = (arr: FeatureModel[], level: string) => {
    return arr.findIndex((x) => x.level === level)
};

// compare features and sort 
export const compareFeatures = (arr: FeatureModel[]) => {
    const sortedArr = arr.slice();
    sortedArr.sort((a, b) => a.level.localeCompare(b.level, undefined, { numeric: true, sensitivity: 'base' }))
    return sortedArr;
};

// check level
export const checkLevel = (level: string) => {
    const regForFilter = new RegExp(`^${level}`);
    return regForFilter
}

export function regForCheckLevelWithDot (level: string): RegExp {
    return new RegExp(`^${level}+\\.`); 
}

//decrement middle level
export const decrementMidleLevel = (level: string, prevLevel: string) => {
    let prevLevelArr = level.split(".");
    let prevStrLastIndex = prevLevel.split(".").length - 1;

    prevLevelArr = prevLevelArr.map((i, index) => {
        if (prevStrLastIndex === index) {
            return i = `${+i - 1}`
        }
        return i;
    });

    const newLevel = prevLevelArr.join(".");
    return newLevel;
};

// decrement begine level
export const descrementBegineLevel = (level: string) => {
    let prevLevelArr = level.split(".");
    prevLevelArr = prevLevelArr.map((i, index) => {
        if (index === 0) {
            return i = `${+i - 1}`
        }
        return i;
    })

    const newLevel = prevLevelArr.join(".");
    return newLevel;
};

// debounce
export const debounce = (cb: Function, ms: number) => {
    let timeout: any;

    return function() {
        let parameters = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            cb.apply(null, parameters);
          }, ms);
    };
}

export function onChangeFeatureField (e: FormEvent<HTMLInputElement>, level: string, forceStateUpdate: (par: any) => void, featureState: FeatureModel[], forceState: number) {
        
    let queryIndex = getItemIndexByLevel(featureState, level);

    switch(e.currentTarget.name) {
        case "level":
            featureState[queryIndex].level = e.currentTarget.value;                
            break;
        case "name":
            featureState[queryIndex].name = e.currentTarget.value;
            break;
        case "feature-description":
            featureState[queryIndex].featureDescription = e.currentTarget.value;
            break;
        case "minEstimate":
            featureState[queryIndex].minEstimate = e.currentTarget.value;
            break;
        case "maxEstimate":
            featureState[queryIndex].maxEstimate = e.currentTarget.value;
            break;
    }
    
    forceStateUpdate(forceState + 1);
} ;
