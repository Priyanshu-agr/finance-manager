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