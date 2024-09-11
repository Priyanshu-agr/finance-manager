import { Router } from "express";
import { createSavingsGoal, getSavingsGoal } from "../controllers/savings.controller";

const router = Router();

router.post("/", createSavingsGoal);
router.get("/user/:userId", getSavingsGoal);

export default router;