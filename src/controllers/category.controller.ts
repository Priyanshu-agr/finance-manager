import { NextFunction, Request, Response } from "express";
import { Category, categorySchema } from "../schema/category.schema";
import { createCategoryService, deleteCategoryService, getCategoriesService, updateCategoryService, getCateogryByIdService } from "../services/category.service";
import { CustomError } from "../utils/error.util";

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await categorySchema.parseAsync(req.body);
        const categoryData: Category = req.body;
        await createCategoryService(categoryData);
        res.status(201).json({ message: "Category created successfully" });
    }
    catch (err: any) {
        next(err);
    }
}

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const categories = await getCategoriesService(Number(userId));
        res.status(200).json({ message: "Categories fetched successfully", data: categories });
    }
    catch (err: any) {
        next(err);
    }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = req.params.id;
        await categorySchema.parseAsync(req.body);
        const categoryData: Category = req.body;
        const category = await getCateogryByIdService(Number(categoryId));
        if (!category) {
            throw new CustomError(404, "Category not found");
        }
        await updateCategoryService(Number(categoryId), categoryData);
        res.status(200).json({ message: "Category updated successfully" });
    }
    catch (err: any) {
        next(err);
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = req.params.id;
        const category = await getCateogryByIdService(Number(categoryId));
        if (!category) {
            throw new CustomError(404, "Category not found");
        }
        await deleteCategoryService(Number(categoryId));
        res.status(200).json({ message: "Category deleted successfully" });
    }
    catch (err: any) {
        next(err);
    }
}

