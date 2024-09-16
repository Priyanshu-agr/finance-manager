import prisma from "../libs/prisma";
import { Category } from "../schema/category.schema";

export const createCategoryService = async (categoryData: Category) => {
    return await prisma.category.create({
        data: {
            name: categoryData.name,
            userId: categoryData.userId
        }
    });
}

export const getCategoriesService = async (userId: number) => {
    return await prisma.category.findMany({
        where: {
            userId: userId
        }
    });
}

export const getCateogryByIdService = async (categoryId: number) => {
    return await prisma.category.findUnique({
        where: {
            id: categoryId
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
