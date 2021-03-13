import React from 'react';

import './index.scss'

export function LoadSpinner(): JSX.Element {
    return (
        <div className="container">
            <div className="dash uno"></div>
            <div className="dash dos"></div>
            <div className="dash tres"></div>
            <div className="dash cuatro"></div>
        </div>
    )
}