import { Router } from "express";
import { createCategory, getCategories, updateCategory, deleteCategory } from "../controllers/category.controller";

const router = Router();

router.post('/', createCategory);
router.get('/user/:id', getCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;