import React from 'react';


export interface EditLayoutProps {
    children: React.ReactChild | React.ReactChild[]

}

export function EditLayout ({ children }: EditLayoutProps) {
    return (
        <div className="edit__layout">
            {children}
        </div>
    );
}