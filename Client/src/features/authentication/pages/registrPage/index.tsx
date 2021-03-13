import React from "react";
import {RegistrLayout} from "../../../../layout/registrLayout";
import {RegistrFormContainer} from '../../containers/registrFormContainer';
import {HeaderContainer} from "../../../../shared/containers/headerContainer";
import {FooterContainer} from "../../../../shared/containers/footerContainer";
import "./index.scss";

// interface AuthPageProps { }

export function AuthPage() {
    return (
        <RegistrLayout>
            <HeaderContainer isAuthPage={true} />
            <div className="auth-container">
                <RegistrFormContainer />
            </div>
            <FooterContainer />
        </RegistrLayout>
    )
}