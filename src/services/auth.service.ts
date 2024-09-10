import bcrypt from "bcrypt";
import prisma from "../libs/prisma";
import { CustomError } from "../utils/error.util";

export const registerUser = async (userName: string, email: string, password: string) => {
    const saltRounds = 10;
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (user) {
        throw new CustomError(400, "User already exists");
    }
    else {
        const user = await prisma.user.findUnique({
            where: {
                userName: userName
            }
        });
        if (user) {
            throw new CustomError(400, "Give username is already taken");
        }
        else {
            const hash = await bcrypt.hash(password, saltRounds);
            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    userName: userName,
                    password: hash
                }
            });
        }
    }
}

export const loginUser = async (userName: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            userName: userName
        }
    });
    if (!user) {
        throw new CustomError(400, "User not found");
    }
    else {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new CustomError(400, "Invalid password");
        }
        return user;
    }
}