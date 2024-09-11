import { Router } from "express";
import homeRouter from "./home.route";
import authRouter from "./auth.route";
import categoryRouter from "./category.route";
import transactionRouter from "./transaction.route";
import savingRouter from "./saving.route";

const router = Router();

router.use("/", homeRouter);
router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/transactions", transactionRouter);
router.use("/savings", savingRouter);

export default router;