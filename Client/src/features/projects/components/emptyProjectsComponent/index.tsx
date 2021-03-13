import React from "react";
import {Button} from "antd";
import { RedoOutlined, FrownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

import "./index.scss";

export function EmptyProjectsComponent(): JSX.Element {

    const history = useHistory()

    function clickHandler(): void {
        history.push("/home");
    }

    return (
        <div className="empty">
            <h1 className="empty-title">The list of project is still empty! <FrownOutlined /></h1>
            <p className="empty-text">Go back to the main page to create the first project</p>
            <Button className="home-btn" onClick={clickHandler} type="primary" icon={<RedoOutlined />}>Home</Button>
        </div>
    )
}