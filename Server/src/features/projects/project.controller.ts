import { Request, Response, NextFunction, } from "express";
import { filterInterface } from "./models/request/filterModel";
import * as  projectService from "./project.service";

export function createProject(req: Request, res: Response, next:NextFunction): void {
    
    projectService.createProject(req.body)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            next(err)
        });
}

export function getProjects(req: Request, res: Response, next:NextFunction): void {
    projectService.getProjects(req.body)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            next(err)
        });
}

export function updateProject(req: Request, res: Response, next:NextFunction): void {    
    projectService.updateProject(req.body)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            next(err)
        });
}

export function deleteProject(req: Request, res: Response, next:NextFunction): void {
    projectService.deleteProject(req.body)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            next(err)
        });
}

export function getProjectById(req: Request, res: Response, next:NextFunction): void {
    projectService.getProjectById(req.query)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            next(err)
        });
}

export function aggregate(req: Request, res: Response, next:NextFunction): void  {
    const featureName = req.query.name as string;
    projectService.aggregate(featureName)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            next(err)
        })
}

export function getFeaturesFromModal(req: Request, res: Response, next:NextFunction): void  {
    const projectId = req.query._id as filterInterface;
    const featureLevel = req.query.level as string;
    projectService.getFeaturesFromModal(projectId, featureLevel)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            next(err)
        })
}