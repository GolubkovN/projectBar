import React from "react";
import {HeaderComponent} from "../../components/headerComponent";
import {IheaderProps} from "../../components/headerComponent";

export function HeaderContainer({isAuthPage}: IheaderProps): JSX.Element {
    return (
        <HeaderComponent isAuthPage={isAuthPage}/>
    );
}