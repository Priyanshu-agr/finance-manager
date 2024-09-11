import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/error.util";
import { Savings, savingsSchema } from "../schema/savings.schema";
import { createSavingsGoalService, getSavingsGoalService } from "../services/savings.service";

export const createSavingsGoal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await savingsSchema.parseAsync(req.body);
        const savingsData: Savings = req.body;
        await createSavingsGoalService(savingsData);
        res.status(201).json({ message: "Savings Goal created successfully" });
    }
    catch (err: any) {
        next(err);
    }
}

export const getSavingsGoal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const savingsGoal = await getSavingsGoalService(Number(userId));
        res.status(200).json({message:"Savings Goal fetched successfully",data:savingsGoal});
    }
    catch (err: any) {
        next(err);
    }
}