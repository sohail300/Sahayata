import { Request, Response } from "express";
import { Admin, District, Emergency } from "../db/schema";
import dotenv from "dotenv";
import { loginSchema, registerAdminSchema } from "../types/zodTypes";
import bcrypt from "bcrypt";
import { Jwt } from "../interfaces/interfaces";
import jwt from "jsonwebtoken";
import { getTodayDate } from "../utils/getDate";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

export async function districtAdminLogin(req: Request, res: Response) {
  try {
    const parsedInput = loginSchema.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(401).json({
        msg: parsedInput.error.issues[0],
      });
    }

    const { email, password } = parsedInput.data;

    const user = await District.findOne({ email: email });

    if (user) {
      const match = await bcrypt.compare(password, user.password as string);

      if (match) {
        const payload: Jwt = { id: user._id, role: "district " };
        const token = jwt.sign(payload, secretKey as string, {
          expiresIn: "24h",
        });
        return res.status(200).json({ msg: "Logged in!", token });
      } else {
        return res.status(401).json({
          msg: "Invalid Credentials",
        });
      }
    } else {
      return res.status(401).json({
        msg: "Invalid Credentials",
      });
    }
  } catch (err) {
    console.log("[ERROR]", err);
    return res.status(500).json({ msg: err });
  }
}

export async function getEmergency(req: Request, res: Response) {
  const date = getTodayDate();
  const emergencyCases = await Emergency.findOne({ date });

  if (emergencyCases) {
    res.status(200).json(emergencyCases);
  } else {
    res.status(403).json({ msg: "No Emergency Cases" });
  }
}

export async function registerAdmin(req: Request, res: Response) {
  try {
    const parsedInput = registerAdminSchema.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(401).json({
        msg: parsedInput.error.issues[0],
      });
    }

    const { name, number, email, password, latitude, longitude } =
      parsedInput.data;

    const admin = await Admin.findOne({ email: email });

    if (admin) {
      return res.status(403).json({ msg: "User already Exists" });
    } else {
      const obj = {
        name,
        email,
        password,
        number,
        latitude,
        longitude,
        avaiable: true,
      };

      const newAdmin = new Admin(obj);
      await newAdmin.save();
      return res.status(201).json({ msg: "Successfully Created Admin!" });
    }
  } catch (err) {
    console.log("[ERROR]", err);
    return res.status(500).json({ msg: err });
  }
}
