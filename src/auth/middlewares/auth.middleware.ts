import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const JWT_SECRET = String(process.env.JWT_SECRET);

// Middleware to authenticate the JWT token
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req?.headers?.["authorization"]?.split(" ")?.[1];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json({ message: "Invalid token" });
      }

      req.user = user;
      next();
    });
  }

  res.status(403).json({ message: "No token provided" });
  next();
};
