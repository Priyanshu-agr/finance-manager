import { NextFunction, Request, Response } from "express";
import { transactionSchema, Transaction } from "../schema/transaction.schema";
import { createTransactionService ,getTransactionsService, updateTransactionService, deleteTransactionService } from "../services/transaction.service";
import { CustomError } from "../utils/error.util";

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await transactionSchema.parseAsync(req.body);
        const transactionData: Transaction = req.body;
        await createTransactionService(transactionData);
        res.status(201).json({ message: "Transaction created successfully" });
    }   
    catch (err: any) {
        next(err);
    }
}

export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const transactions = await getTransactionsService(Number(userId));
        res.status(200).json({message:"Transactions fetched successfully",data:transactions});
    }
    catch (err: any) {
        next(err);
    }
}

export const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transactionId = req.params.transactionId;
        await transactionSchema.parseAsync(req.body);
        const transactionData: Transaction = req.body;
        if(!transactionId){
            throw new CustomError(400,"Transaction Id is required");
        }
        await updateTransactionService(Number(transactionId),transactionData);
        res.status(200).json({message:"Transaction updated successfully"});
    }
    catch (err: any) {
        next(err);
    }
}

export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transactionId = req.params.transactionId;
        if(!transactionId){
            throw new CustomError(400,"Transaction Id is required");
        }
        await deleteTransactionService(Number(transactionId));
        res.status(200).json({message:"Transaction deleted successfully"});
    }
    catch (err: any) {
        next(err);
    }
};

