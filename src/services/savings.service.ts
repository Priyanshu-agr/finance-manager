import prisma from "../libs/prisma";
import { savingsSchema, Savings } from "../schema/savings.schema";

export const createSavingsGoalService = async (savingsData: Savings) => {
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