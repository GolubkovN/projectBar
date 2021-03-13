import React from "react";
import "./index.scss";

const SORT_TYPE = {
    UNSET: "unset",
    ALPHA: "alpha",
    REVERSE: "alpha-reverse"
}

interface SortingProps {
    changeSortType: (sortType: string) => void;
}

export function SortingComponent({changeSortType}: SortingProps): JSX.Element {
    return (
        <div>
            <select defaultValue={"select sorting type:"} 
                onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => changeSortType(evt.target.value)} className="sort">
                <option disabled>select sorting type:</option>
                <option value={SORT_TYPE.UNSET}>default</option>
                <option value={SORT_TYPE.ALPHA}>A-Z</option>
                <option value={SORT_TYPE.REVERSE}>Z-A</option>
            </select>
        </div>
    )
}