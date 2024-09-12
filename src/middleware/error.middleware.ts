import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { CustomError } from "../utils/error.util";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof CustomError) {
        return res.status(err.status).json({
            success: false,
            error: {
                message: err.message,
                name: err.name
            }
        });
    }
    else if(err instanceof ZodError){
        return res.status(400).json({
            success: false,
            error: {
                message: err.errors,
                name: err.name
            }
        });
    }
    else if(err instanceof PrismaClientInitializationError){
        return res.status(503).json({
            success:false,
            error: {
                message: "Can't reach database",
                name:"Internal Error"
            }
        })
    }
    return res.status(500).json({
        success: false,
        error: {
            message: err.message,
            name: err.name
        }
    });
}

export default errorMiddleware;