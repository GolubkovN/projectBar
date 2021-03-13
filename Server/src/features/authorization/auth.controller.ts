//Vendors
import { Request, Response, NextFunction } from "express";
//Services
import * as  authService from "./auth.service";

export function createUser(req: Request, res: Response, next:NextFunction): void {
    
    authService.createUser(req.body)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            next(err);
        });
}

export function loginUser(req: Request, res: Response, next: NextFunction): void {
    authService.loginUser(req.body)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            next(err)
        })
}