import {type Request, type Response, type NextFunction} from "express";
import jwt from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "./config.js";

export const userMiddleware = (req : Request, res : Response, next : NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, JWT_USER_PASSWORD);
    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next()
    }else{
        res.status(403).json({
            message : "You are not logged in"
        })
    }
}