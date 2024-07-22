import { Request, Response } from "express";
import { Admin, District, Emergency } from "../db/schema";
import dotenv from "dotenv";
import { registerAdminSchema } from "../types/adminSchema";
import {
  emailSchema,
  loginSchema,
  passwordSchema,
  resetPasswordSchema,
} from "../types/districtAdminSchema";
import bcrypt from "bcrypt";
import { Jwt } from "../interfaces/interfaces";
import jwt from "jsonwebtoken";
import { getTodayDate } from "../utils/getDate";
import { mailer } from "../utils/mailer";

dotenv.config();
const secretKey = process.env.JWT_SECRET;

export async function districtAdminLogin(req: Request, res: Response) {
  try {
    const parsedInput = loginSchema.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(401).json({
        msg: parsedInput.error.issues[0],
        success: false,
      });
    }

    const { number, password } = parsedInput.data;

    const user = await District.findOne({ number: number });
    console.log(user);

    if (user) {
      const match = await bcrypt.compare(password, user.password as string);
      console.log(match);

      if (match) {
        const payload: Jwt = { id: user._id, role: "district " };
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

export async function registerAdmin(req: Request, res: Response) {
  try {
    const parsedInput = registerAdminSchema.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(401).json({
        msg: parsedInput.error.issues[0],
        success: false,
      });
    }

    const { name, number, password, latitude, longitude } = parsedInput.data;

    const admin = await Admin.findOne({ number });

    if (admin) {
      return res.status(403).json({ msg: "User already Exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const obj = {
        name,
        password: hashedPassword,
        number,
        latitude,
        longitude,
        avaiable: true,
      };

      const newAdmin = new Admin(obj);
      await newAdmin.save();
      return res
        .status(201)
        .json({ msg: "Successfully Created Admin!", success: true });
    }
  } catch (err) {
    console.log("[ERROR]", err);
    return res.status(500).json({ msg: err, success: false });
  }
}

export async function sendEmail(req: Request, res: Response) {
  try {
    const parsedInput = emailSchema.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(401).json({
        msg: parsedInput.error.issues[0],
        success: false,
      });
    }

    const { email } = parsedInput.data;

    const admin = await District.findOne({ email });

    if (admin) {
      mailer(email, res);

      return res.status(201).json({ msg: "Email sent!", success: true });
    } else {
      return res
        .status(400)
        .json({ msg: "User does not exist", success: false });
    }
  } catch (err) {
    console.log("[ERROR]", err);
    return res.status(500).json({ msg: err, success: false });
  }
}

export async function changePassword(req: Request, res: Response) {
  try {
    const parsedInput = resetPasswordSchema.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(401).json({
        msg: parsedInput.error.issues[0],
        success: false,
      });
    }

    const { password, token } = parsedInput.data;

    const admin = await District.findOne({ forgotPasswordVerifyToken: token });

    if (
      admin &&
      admin.forgotPasswordExpiryDate != null &&
      admin.forgotPasswordExpiryDate > new Date()
    ) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.forgotPasswordExpiryDate = null;
      admin.forgotPasswordVerifyToken = null;
      admin.password = hashedPassword;

      await admin.save();
      return res.status(201).json({ msg: "Password updated!", success: true });
    } else {
      return res.status(400).json({ msg: "Invalid OTP", success: false });
    }
  } catch (err) {
    console.log("[ERROR]", err);
    return res.status(500).json({ msg: err, success: false });
  }
}

export async function getEmergency(req: Request, res: Response) {
  try {
    const date = getTodayDate();
    const emergencyCases = await Emergency.findOne({ date });

    return res
      .status(200)
      .json({ emergencyCases: emergencyCases || [], success: true });
  } catch (err) {
    console.log("[ERROR]", err);
    return res.status(500).json({ msg: err, success: false });
  }
}
