import React from "react";
import {HeaderContainer} from "../../../../shared/containers/headerContainer";
import {FooterContainer} from "../../../../shared/containers/footerContainer";
import { EditLayout } from "layout/editLayout";
import "./index.scss"
import { EditContainer } from "features/projects/containers/editContainer";

export function EditPage(): JSX.Element {
    
    return (
        <EditLayout>
            <HeaderContainer />
            <div className="edit-container">
                <EditContainer />
            </div>
            <FooterContainer />
        </EditLayout>
    )
}