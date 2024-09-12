import { Router } from "express";
import { createTransaction, getTransactions, updateTransaction, deleteTransaction, transactionReport, getTransactionsByCategory } from "../controllers/transaction.controller";

const router = Router();

router.post("/", createTransaction);
router.get("/user/:userId", getTransactions);
router.put("/:transactionId", updateTransaction);
router.delete("/:transactionId", deleteTransaction);
router.get('/category/:categoryId', getTransactionsByCategory);
router.get("/report/user/:userId", transactionReport);

export default router;