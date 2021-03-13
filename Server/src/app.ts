//Vendors
import * as bodyParser from 'body-parser';
import cors from "cors";
import express from "express";
import helmet from 'helmet';
import morgan from 'morgan';
//Constants
import { ApiEndpointsConstants } from './config/api-endpoints.constants';
import "./config/db";
//Routes
import { authRouter } from "./features/authorization/auth.route";
import { projectRouter } from './features/projects/project.route';
import { errorHandler } from './helpers/errorHandler';
//Helpers


class App {
    public express: express.Application;
    constructor() {
        this.express = express();
        this.setMiddleware();
        this.setRoutes();
        this.catchErrors();
    }

    private setMiddleware(): void {
        this.express.use(cors());
        this.express.use(morgan("dev"));
        this.express.use(bodyParser.json({ limit: '10mb' }));
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(helmet());
    }

    private setRoutes(): void {
        const getUrl = (route: string): string =>  ApiEndpointsConstants.API + route;
        this.express.use(getUrl(ApiEndpointsConstants.AUTH), authRouter)
        this.express.use(getUrl(ApiEndpointsConstants.PROJECT), projectRouter)
    }

    private catchErrors(): void {
        this.express.use(errorHandler);
    }
}

export default new App().express;