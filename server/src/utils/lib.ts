import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config;

interface TokenPayload extends JwtPayload {
    id: string;
    email?: string;
    role?: string;
  }
  

const SECRET_KEY = process.env.JWT_SALT || "oiwuehsjbdfgsdfihaisqw";

export const generateToken = (payload: object, expiresIn: string = "1h"): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const verifyToken = (token: string): string | JwtPayload => {
    try {
        return jwt.verify(token, SECRET_KEY) as TokenPayload;
    } catch (error: any) {
        console.error("Invalid Token:", error);
        return "Invalid Token";
    }
};
