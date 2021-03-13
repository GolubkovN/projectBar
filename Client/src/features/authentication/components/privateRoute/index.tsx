import React from "react";
import {Route, Redirect} from "react-router-dom";

interface AuthPrivateRouteProps {
    path: string;
    render: any;
}

const PrivateRoute = ({path, render}: AuthPrivateRouteProps) => {

    return (
      <Route
        path={path}
        render={(routeProps) => {
          return (
            localStorage.accessKey 
            ? <Redirect to="/projects" />
            : render(routeProps)
              
          );
        }}
      />
    );
  };

  export default PrivateRoute;