import { Router } from "express";
import { createTransaction, getTransactions, updateTransaction, deleteTransaction } from "../controllers/transaction.controller";

const router = Router();

router.post("/", createTransaction);
router.get("/:userId", getTransactions);
router.put("/:transactionId", updateTransaction);
router.delete("/:transactionId", deleteTransaction);

export default router;