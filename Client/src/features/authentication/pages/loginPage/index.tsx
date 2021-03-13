import React from "react";
import {LoginLayout} from "../../../../layout/loginLayout";
import {LoginFormContainer} from '../../containers/loginFormContainer';
import {HeaderContainer} from "../../../../shared/containers/headerContainer";
import {FooterContainer} from "../../../../shared/containers/footerContainer";
import "./index.scss";

export function LoginPage() {
    return (
        <LoginLayout>
            <HeaderContainer isAuthPage={true}/>
            <div className="login-container">
                <LoginFormContainer />
            </div>
            <FooterContainer />
        </LoginLayout>
    )
}