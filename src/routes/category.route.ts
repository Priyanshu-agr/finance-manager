import { Router } from "express";
import { createCategory, getCategories, updateCategory, deleteCategory, getTransactionsByCategory } from "../controllers/category.controller";

const router = Router();

router.post('/', createCategory);
router.get('/user/:userId', getCategories);
router.get('/transactions/:categoryId', getTransactionsByCategory);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);

export default router;