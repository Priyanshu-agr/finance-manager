import prisma from "../libs/prisma";
import { Savings } from "../schema/savings.schema";
import { CustomError } from "../utils/error.util";

export const createSavingsGoalService = async (savingsData: Savings) => {
    const goal = await prisma.saving.findUnique({
        where:{
            userId: savingsData.userId
        }
    });

    if(goal){
        throw new CustomError(400,"Savings goal already exists");
    }
    await prisma.saving.create({
        data: {
            targetAmount: savingsData.amount,
            targetDate: new Date(savingsData.date),
            userId: savingsData.userId
        }
    });
}

export const getSavingsGoalService = async (userId: number) => {
    return await prisma.saving.findUnique({
        where: {
            userId: userId
        }
    });
}