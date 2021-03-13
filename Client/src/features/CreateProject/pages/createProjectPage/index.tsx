import React from "react";
import {HomeLayout} from "../../../../layout/homeLayout";
import {HeaderContainer} from "../../../../shared/containers/headerContainer";
import {FooterContainer} from "../../../../shared/containers/footerContainer";
import "./index.scss";
import { CreateFormContainer } from "features/CreateProject/containers/createFormContainer";

export function CreateProjectPage() {
    return (
        <HomeLayout>
            <HeaderContainer />
            <div className="home-container">
                <CreateFormContainer />
            </div>
            <FooterContainer />
        </HomeLayout>
    )
}