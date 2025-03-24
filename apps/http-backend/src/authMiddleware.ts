import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
// import dotenv from "dotenv";
// dotenv.config();

export interface AuthRequest extends Request {
  userId?: string; // Extend Request to include userId
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized / Invalid token" });
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized / Invalid token" });
    return;
  }

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    ) as jwt.JwtPayload;
    if (!decoded || !decoded.userId) {
      res.status(401).json({ message: "Unauthorized / Invalid token" });
      return;
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized / Invalid token" });
    return;
  }
};
