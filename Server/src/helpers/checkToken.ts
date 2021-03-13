import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import key from "../config/config";
import { BaseError } from "./appError";

export function checkJwtToken(req: Request, res: Response, next: NextFunction) {
    let clientToken = req.headers.authorization as string;
    const token = clientToken.split("Bearer ")[1];    
    console.log(token);
    
    jwt.verify(token, key.JWT_ENCRYPTION, (err) => {
        if(err) {
            throw new BaseError(`${res.status}`, httpStatus.UNAUTHORIZED, "Unouthorized", false);
        }
    });
    return next();
}