import express from "express";
import {
  changePassword,
  districtAdminLogin,
  getEmergency,
  registerAdmin,
  sendEmail,
} from "../controllers/district";

const router = express.Router();

router.post("/login", districtAdminLogin);
router.post("/forgotPassword", sendEmail);
router.post("/resetPassword", changePassword);

// It registers the Admin, not for the District Admin registration.
router.post("/registerAdmin", registerAdmin);

router.get("/emergency", getEmergency);

// Modify the openapi spec file
router.post("/map");

export default router;
