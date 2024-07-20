import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { Jwt } from "../interfaces/interfaces";

dotenv.config();

export const secretKey = process.env.SECRET_KEY;

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      if (!secretKey) {
        return res.status(403).json({ msg: "Secret Key not defined" });
      }

      if (token) {
        const user: Jwt = (await jwt.verify(token, secretKey)) as Jwt;

        req.headers["id"] = String(user.id);
        req.headers["role"] = user.role;
        next();
      }
    }
  } catch (error) {
    console.log("[ERROR]", error);
  }
}
