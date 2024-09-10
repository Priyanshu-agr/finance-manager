import { NextFunction, Request, Response } from "express";

export const homeRoute = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json({ success: true, message: "Welcome to the home page" });
    }
    catch (err: any) {
        next(err);
    }
}