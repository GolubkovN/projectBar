import { Request, Response, NextFunction } from "express";
import { BaseError } from "./appError";

export function errorHandler (error: BaseError, req: Request, res: Response, next:NextFunction) {
   return res.status(error.httpCode).send(error.message);
}