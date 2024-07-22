import express, { Request, Response } from "express";
import { Admin } from "../db/schema";
import { adminEditSchema } from "../types/adminSchema";
import { loginSchema } from "../types/districtAdminSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Jwt } from "../interfaces/interfaces";

const secretKey = process.env.JWT_SECRET;

export async function adminLogin(req: Request, res: Response) {
  try {
    const parsedInput = loginSchema.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(401).json({
        msg: parsedInput.error.issues[0],
        success: false,
      });
    }

    const { number, password } = parsedInput.data;

    const user = await Admin.findOne({ number });

    if (user) {
      const match = await bcrypt.compare(password, user.password as string);

      if (match) {
        const payload: Jwt = { id: user._id, role: "admin" };
        const token = jwt.sign(payload, secretKey as string, {
          expiresIn: "24h",
        });
        return res
          .status(200)
          .json({ msg: "Logged in!", token, success: true });
      } else {
        return res.status(401).json({
          msg: "Invalid Credentials",
          success: false,
        });
      }
    } else {
      return res.status(401).json({
        msg: "Invalid Credentials",
        success: false,
      });
    }
  } catch (err) {
    console.log("[ERROR]", err);
    return res.status(500).json({ msg: err, success: false });
  }
}

export async function adminProfile(req: Request, res: Response) {
  try {
    const id = req.headers["id"];

    const admin = await Admin.findById(id).select("-select");

    if (admin) {
      return res.status(200).json({
        admin,
      });
    } else {
      return res.status(401).json({
        msg: "Admin does not exist",
      });
    }
  } catch (err) {
    console.log("[ERROR]", err);
    return res.status(500).json({ msg: err });
  }
}

export async function editAdmin(req: Request, res: Response) {
  try {
    const id = req.headers["id"];

    const parsedInput = adminEditSchema.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(401).json({
        msg: parsedInput.error.issues[0],
      });
    }

    const { worker, available } = parsedInput.data;

    const updatedResponse = await Admin.findByIdAndUpdate(id, {
      available,
      worker,
    });

    if (!updatedResponse) {
      res.status(403).json({ msg: "Not Updated" });
    } else {
      res.status(201).json({ msg: "Updated" });
    }
  } catch (err) {
    console.log("[ERROR]", err);
    return res.status(500).json({ msg: err });
  }
}
