import { Request, Response } from "express";
import axios from "axios";
import { Emergency, Contact, User, Admin } from "../db/schema";
import {
  contactSchema,
  emergencyCaseSchema,
  sendOTPSchema,
  updateUserSchema,
  verifyOTPSchema,
} from "../types/zodTypes";
import { getTodayDate } from "../utils/getDate";
import twilio from "twilio";

const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const client = twilio(accountSid, authToken);

export async function sendOTP(req: Request, res: Response) {
  try {
    const parsedInput = sendOTPSchema.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(401).json({
        msg: parsedInput.error.issues[0],
      });
    }

    const { number } = parsedInput.data;

    const service = await client.verify.v2.services.create({
      friendlyName: "RescueRadar Verify Service",
    });
    console.log(service.sid);

    const verification = await client.verify.v2
      .services(service.sid)
      .verifications.create({ to: number, channel: "sms" });
    console.log(verification.status);

    const user = await User.findOne({ number });

    if (user) {
      user.service_sid = service.sid;
      await user.save();
    } else {
      const obj = { number };
      const newUser = new User(obj);
      await newUser.save();
    }

    return res.status(200).json({ msg: "OTP sent successfully" });
  } catch (err) {
    console.log("[ERROR]", err);
    return res.status(500).json({ msg: err });
  }
}

export async function verifyOTP(req: Request, res: Response) {
  try {
    const parsedInput = verifyOTPSchema.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(401).json({
        msg: parsedInput.error.issues[0],
      });
    }

    const { otp, number } = parsedInput.data;

    const user = await User.findOne({ number });

    if (user) {
      const service_sid = user.service_sid;

      if (service_sid) {
        const verification_check = await client.verify.v2
          .services(service_sid)
          .verificationChecks.create({ to: number, code: otp });

        console.log(verification_check.status);
        res.status(200).send("OTP verified step");
      } else {
        return res.status(400).json({ msg: "OTP cannot be verified" });
      }
    } else {
      return res.status(400).json({ msg: "User does not exist" });
    }
  } catch (err) {
    console.log("[ERROR]", err);
    return res.status(500).json({ msg: err });
  }
}

async function getNearestCamp(
  latitude: number,
  longitude: number,
  res: Response
) {
  try {
    const originLatitude = latitude;
    const originLongitude = longitude;

    let min = Number.MAX_VALUE;
    let mincampId = "";
    const adminCamps = await Admin.find();

    adminCamps.forEach(async (camp) => {
      const destinationLatitude = camp.latitude;
      const destinationLongitude = camp.longitude;

      const campId = camp._id;
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destinationLatitude},${destinationLongitude}&origins=${originLatitude},${originLongitude}&units=imperial&key=${process.env.GOOGLE_API}`;

      const response = await axios.get(url);
      const dist = response.data.rows[0].elements[0].distance.text;
      let num = dist.replace(/[^\d.-]/g, "");
      if (min > num) {
        min = num;
        mincampId = String(campId);
      }
    });
    console.log(mincampId);
    return mincampId;
  } catch (err) {
    console.log("[ERROR]", err);
    return res.status(500).json({ msg: err });
  }
}

export async function postEmergencyCase(req: Request, res: Response) {
  try {
    const id = 12;

    const parsedInput = emergencyCaseSchema.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(401).json({
        msg: parsedInput.error.issues[0],
      });
    }

    const { cause, latitude, longitude } = parsedInput.data;
    const user = await User.findById(id);

    if (user) {
      let date = getTodayDate();
      const nearestCampId = await getNearestCamp(latitude, longitude, res);

      const obj = {
        name: user.name,
        number: user.number,
        latitude,
        longitude,
        cause,
        date,
        nearestCampId,
        solved: false,
      };
      const newEmergencyCase = new Emergency(obj);
      await newEmergencyCase.save();
      console.log("Emergency Case saved");
      res.status(201).json({ msg: "Success!" });
    } else {
      return res.status(400).json({ msg: "User does not exist" });
    }
  } catch (err) {
    console.log("[ERROR]", err);
    return res.status(500).json({ msg: err });
  }
}

export async function getProfile(req: Request, res: Response) {
  try {
    const { id } = req.body;

    const user = await User.findById(id).select("name number");

    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(400).json({ msg: "User does not exist" });
    }
  } catch (err) {
    console.log("[ERROR]", err);
    return res.status(500).json({ msg: err });
  }
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const id = 12;

    const parsedInput = updateUserSchema.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(401).json({
        msg: parsedInput.error.issues[0],
      });
    }

    const { name } = parsedInput.data;
    const user = await User.findById(id);

    if (user) {
      user.name = name;
      await user.save();
      return res.status(200).json({ msg: "Updated" });
    } else {
      return res.status(400).json({ msg: "User does not exist" });
    }
  } catch (err) {
    console.log("[ERROR]", err);
    return res.status(500).json({ msg: err });
  }
}

export async function postContact(req: Request, res: Response) {
  try {
    const parsedInput = contactSchema.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(401).json({
        msg: parsedInput.error.issues[0],
      });
    }

    const { name, number, description, userId } = parsedInput.data;
    const user = await User.findOne({ number });

    if (user) {
      const obj = { name, number, description, userId };
      const newContact = new Contact(obj);
      await newContact.save();
      console.log("Contact saved");
      return res.status(201).json({ msg: "Success!" });
    } else {
      return res.status(400).json({ msg: "User does not exist" });
    }
  } catch (err) {
    console.log("[ERROR]", err);
    return res.status(500).json({ msg: err });
  }
}
