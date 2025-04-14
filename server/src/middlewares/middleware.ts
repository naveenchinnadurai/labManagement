import { NextFunction, Response, Request } from "express";
import { verifyToken } from "../utils/lib";

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string;
    }
}

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    try {
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization token missing or invalid' });
        }

        const token = authHeader.split(' ')[1]; // Correctly extract the token

        console.log(token)

        const decoded = verifyToken(token);

        if (!decoded || typeof decoded === 'string') {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        // Optionally attach user info to request
        req.userId = decoded.id;

        console.log(decoded);

        next();

    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};