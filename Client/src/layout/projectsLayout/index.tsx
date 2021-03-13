import React from 'react';


export interface loginLayoutProps {
    children: React.ReactChild | React.ReactChild[]

}

export function ProjectsLayout ({ children }: loginLayoutProps) {
    return (
        <div className="projects__layout">
            {children}
        </div>
    );
}