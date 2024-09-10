import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, userName, password } = req.body;
        await registerUser(userName, email, password);
        res.json({ success: true, message: "User registered successfully" });
    }
    catch (err: any) {
        next(err);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, password } = req.body;
        const user = await loginUser(userName, password);
        res.json({ success: true, message: "Login route" });
    }
    catch (err: any) {
        next(err);
    }
}