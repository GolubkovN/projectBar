import React from 'react';
import "./index.scss"

export interface formLayoutProps {
    children: React.ReactChild | React.ReactChild[]

}

export function RegistrLayout ({ children }: formLayoutProps) {
    return (
        <div className="form__layout">
            {children}
        </div>
    );
}