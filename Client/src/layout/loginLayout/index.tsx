import React from 'react';
// import "./index.scss"

export interface loginLayoutProps {
    children: React.ReactChild | React.ReactChild[]

}

export function LoginLayout ({ children }: loginLayoutProps) {
    return (
        <div className="login__layout">
            {children}
        </div>
    );
}