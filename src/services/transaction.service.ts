import { TransactionType } from "@prisma/client";
import prisma from "../libs/prisma";
import { Transaction } from "../schema/transaction.schema";

export const createTransactionService = async (transactionData: Transaction) => {
    return await prisma.transaction.create({
        data: {
            amount: transactionData.amount,
            description: transactionData.description,
            date: transactionData.date ? new Date(transactionData.date) : undefined,
            categoryId: transactionData.categoryId,
            userId: transactionData.userId,
            type: transactionData.type.toUpperCase() as TransactionType
        }
    });
}

export const viewTransactionService = async (transactionId: number) => {
    return await prisma.transaction.findUnique({
        where: {
            id: transactionId
        }
    });
}

export const getTransactionsService = async (userId: number) => {
    return await prisma.transaction.findMany({
        where: {
            userId: userId
        }
    });
}

export const updateTransactionService = async (transactionId: number, transactionData: Transaction) => {
    return await prisma.transaction.update({
        where: {
            id: transactionId
        },
        data: {
            amount: transactionData.amount,
            description: transactionData.description,
            date: transactionData.date ? new Date(transactionData.date) : undefined,
            categoryId: transactionData.categoryId,
            type: transactionData.type.toUpperCase() as TransactionType
        }
    });
}

export const deleteTransactionService = async (transactionId: number) => {
    return await prisma.transaction.delete({
        where: {
            id: transactionId
        }
    });
}

export const getTransactionsByCategoryService = async (categoryId: number) => {
    return await prisma.transaction.findMany({
        where: {
            categoryId: categoryId
        }
    });
}

export const transactionReportService = async (userId: number, year: number, month: number) => {
    console.log(new Date(year, month - 1, 1));

    interface CategoryReport {
        id: number;
        name: string;
        totalIncome: number;
        totalExpense: number;
    }

    interface TransactionReport {
        totalIncome: number;
        totalExpense: number;
        categories: CategoryReport[];
    }


    const report: TransactionReport = {
        totalIncome: 0,
        totalExpense: 0,
        categories: [],
    };

    const transactions = await prisma.transaction.findMany({
        where: {
            userId: userId,
            date: {
                gte: new Date(year, month - 1, 1),
                lt: new Date(year, month, 1)
            }
        },
        include: {
            Category: true
        }
    });

    const categoryMap = new Map<number, CategoryReport>();


    transactions.forEach((transaction) => {
        const { id, name } = transaction.Category;

        if (!categoryMap.has(id)) {
            categoryMap.set(id, {
                id,
                name,
                totalIncome: 0,
                totalExpense: 0,
            });
        }

        const categoryReport = categoryMap.get(id)!;



        if (transaction.type === "DEPOSIT") {
            report.totalIncome += transaction.amount;
            categoryReport.totalIncome += transaction.amount;
        }
        else {
            report.totalExpense += transaction.amount;
            categoryReport.totalExpense += transaction.amount;
        }
    });
    report.categories = Array.from(categoryMap.values());


    return report;
}