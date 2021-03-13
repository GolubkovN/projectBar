import React from "react";
import {Route, Redirect} from "react-router-dom";

interface AuthPrivateRouteProps {
    path: string;
    render: any;
}

const ProjectsPrivateRoute = ({path, render}: AuthPrivateRouteProps) => {

    return (
      <Route
        path={path}
        render={(routeProps) => {
          return (
            localStorage.accessKey 
              ? render(routeProps)
              : <Redirect to="/login" />
          );
        }}
      />
    );
  };

  export default ProjectsPrivateRoute;