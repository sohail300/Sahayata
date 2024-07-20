import express from "express";
import {
  getProfile,
  postContact,
  postEmergencyCase,
  sendOTP,
  updateProfile,
  verifyOTP,
} from "../controllers/user";

const router = express.Router();

router.post("/sendotp", sendOTP);

router.post("/verifyotp", verifyOTP);

router.post("/emergency", postEmergencyCase);

router.get("/profile", getProfile);

router.put("/profile", updateProfile);

router.post("/contact", postContact);

// Modify the openapi spec file
router.post("/map");

export default router;
