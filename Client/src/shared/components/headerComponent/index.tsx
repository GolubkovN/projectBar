import React from "react";
import {useHistory, Link} from "react-router-dom";
import "./index.scss";

export interface IheaderProps {
    isAuthPage?: boolean
}

export function HeaderComponent({isAuthPage = false}: IheaderProps): JSX.Element {

    const history = useHistory();

    function logOutHandler(): void {
        history.push("/login");
        localStorage.removeItem("accessKey");
    }
    

    return (
    <header className="header">
        <nav className="nav">
            <div className="nav__wrapper">
                <a href="#!" className="logo">Project BAR</a>
               {
                   !isAuthPage &&  <ul className="nav__list">
                                        <li><Link to="/projects" data-hover="Projects">Projects</Link></li>
                                        <li><Link to="/create-project" data-hover="Create Project">Create Project</Link></li>
                                        <li><a href="/" onClick={() => logOutHandler()} data-hover="log out" className="log-out">log out</a></li>
                                    </ul>
               }
            </div>
        </nav>
    </header>
    );
};