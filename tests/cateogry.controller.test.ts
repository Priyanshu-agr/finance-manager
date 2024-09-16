import { vi, describe, it, expect, beforeEach } from "vitest";
import * as CategoryService from "../src/services/category.service";
import * as CategoryController from "../src/controllers/category.controller";
import { CustomError } from "../src/utils/error.util";
import { Request, Response, NextFunction, response } from "express";

vi.mock("../src/services/category.service", () => ({
    createCategoryService: vi.fn(),
    getCategoriesService: vi.fn(),
    getCateogryByIdService: vi.fn(),
    updateCategoryService: vi.fn(),
    deleteCategoryService: vi.fn(),
}));

vi.mock("../src/utils/error.util", () => ({
    CustomError: class {
        constructor(public type: string, public message: string) {}
      }
}));

describe("Category Controller", () => {
    let req: Request;
    let res: Response;
    const next = vi.fn();
    beforeEach(() => {
        vi.resetAllMocks()
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as any as Response;
        req = {
            params: {},
            query: {},
            body: {},
        } as Request;
    })

    describe("getCategories", () => {
        it("should get all categories for a user", async () => {
            req.params = { id: "1" };
            const categories = [{ id: 1, name: "Category 1", userId: 1 }, { id: 2, name: "Category 2", userId: 1 }];
            vi.mocked(CategoryService.getCategoriesService).mockResolvedValueOnce(categories);

            await CategoryController.getCategories(req, res, next);
            expect(vi.mocked(CategoryService.getCategoriesService)).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ data: categories, message: "Categories fetched successfully" });
        })
    })
    describe("createCategory", () => {
        it("should create a category", async () => {
            req.body = { name: "Category 1", userId: 1 };
            await CategoryController.createCategory(req, res, next);
            expect(vi.mocked(CategoryService.createCategoryService)).toHaveBeenCalledWith({ name: "Category 1", userId: 1 });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "Category created successfully" });
        })
    })
    describe("updateCategory", () => {
        it("should update a category", async () => {
            req.params = { id: "1" };
            req.body = { name: "Category 1", userId: 1 };
            vi.mocked(CategoryService.getCateogryByIdService).mockResolvedValueOnce({ id: 1, name: "Category 1", userId: 1 });

            await CategoryController.updateCategory(req, res, next);
            expect(vi.mocked(CategoryService.getCateogryByIdService)).toHaveBeenCalledWith(1);
            expect(vi.mocked(CategoryService.updateCategoryService)).toHaveBeenCalledWith(1, { name: "Category 1", userId: 1 });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Category updated successfully" });
        })
        it("should throw an error if category is not found", async () => {
            req.params = { id: "1" };
            req.body = { name: "Category 1", userId: 1 };
            vi.mocked(CategoryService.getCateogryByIdService).mockResolvedValueOnce(null);

            await CategoryController.updateCategory(req, res, next);
            expect(vi.mocked(CategoryService.getCateogryByIdService)).toHaveBeenCalledWith(1);
            expect(CategoryService.updateCategoryService).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalled();
            expect(next.mock.calls[0][0]).toBeInstanceOf(CustomError);
            expect(next.mock.calls[0][0].type).toBe(404);
            expect(next.mock.calls[0][0].message).toBe("Category not found");
        })
    })
    describe("deleteCategory", () => {
        it("should delete a category", async () => {
            req.params = { id: "1" };
            vi.mocked(CategoryService.getCateogryByIdService).mockResolvedValueOnce({ id: 1, name: "Category 1", userId: 1 });

            await CategoryController.deleteCategory(req, res, next);
            expect(vi.mocked(CategoryService.getCateogryByIdService)).toHaveBeenCalledWith(1);
            expect(vi.mocked(CategoryService.deleteCategoryService)).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Category deleted successfully" });
        })
        it("should throw an error if category is not found", async () => {
            req.params = { id: "1" };
            vi.mocked(CategoryService.getCateogryByIdService).mockResolvedValueOnce(null);

            await CategoryController.deleteCategory(req, res, next);
            expect(vi.mocked(CategoryService.getCateogryByIdService)).toHaveBeenCalledWith(1);
            expect(CategoryService.deleteCategoryService).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalled();
            expect(next.mock.calls[0][0]).toBeInstanceOf(CustomError);
            expect(next.mock.calls[0][0].type).toBe(404);
            expect(next.mock.calls[0][0].message).toBe("Category not found");
        })
    })
})