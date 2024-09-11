import prisma from "../libs/prisma";
import { Category } from "../schema/category.schema";
import { CustomError } from "../utils/error.util";

export const createCategoryService = async (categoryData: Category) => {
    return await prisma.category.create({
        data: {
            name: categoryData.name,
            userId: categoryData.userId
        }
    });
}

export const getCategoriesService = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    if(!user) {
        throw new CustomError(404, "User not found");
    }
    return await prisma.category.findMany({
        where: {
            userId: userId
        }
    });
}

export const updateCategoryService = async (categoryId: number, categoryData: Category) => {
    return await prisma.category.update({
        where: {
            id: categoryId
        },
        data: {
            name: categoryData.name
        }
    });
}

export const deleteCategoryService = async (categoryId: number) => {
    return await prisma.category.delete({
        where: {
            id: categoryId
        }
    });
}

export const getTransactionsByCategoryService = async (categoryId: number) => {
    return await prisma.transaction.findMany({
        where: {
            categoryId: categoryId
        }
    });
}

