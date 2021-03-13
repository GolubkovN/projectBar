import React from 'react';
// import "./index.scss"

export interface loginLayoutProps {
    children: React.ReactChild | React.ReactChild[]

}

export function HomeLayout ({ children }: loginLayoutProps) {
    return (
        <div className="home__layout">
            {children}
        </div>
    );
}