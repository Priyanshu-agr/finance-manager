import { Router } from "express";
import homeRouter from "./home.route";
import authRouter from "./auth.route";
import categoryRouter from "./category.route";
import transactionRouter from "./transaction.route";

const router = Router();

router.use("/", homeRouter);
router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/transaction", transactionRouter);

export default router;