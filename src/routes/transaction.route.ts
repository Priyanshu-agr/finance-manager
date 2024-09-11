import { Router } from "express";
import { createTransaction, getTransactions, updateTransaction, deleteTransaction,transactionReport } from "../controllers/transaction.controller";

const router = Router();

router.post("/", createTransaction);
router.get("/user/:userId", getTransactions);
router.put("/:transactionId", updateTransaction);
router.delete("/:transactionId", deleteTransaction);
router.get("/report/:userId", transactionReport);

export default router;