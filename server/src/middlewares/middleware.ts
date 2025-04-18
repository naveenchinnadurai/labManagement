import { NextFunction, Response, Request } from "express";
import { verifyToken } from "../utils/lib";

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            id: string,
            email: string,
            role: string,
            sessionId: string | null,
        }
    }
}

export const checkUser = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    try {
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization token missing or invalid' });
        }

        const token = authHeader.split(' ')[1]; // Correctly extract the token

        const decoded = verifyToken(token);

        if (!decoded || typeof decoded === 'string') {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        // Optionally attach user info to request

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            sessionId: decoded.sessionId
        }

        next();

    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};