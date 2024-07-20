import express from "express";
import {
  districtAdminLogin,
  getEmergency,
  registerAdmin,
} from "../controllers/district";

const router = express.Router();

router.post("/login", districtAdminLogin);

router.get("/emergency", getEmergency);

// It registers the Admin, not for the District Admin registration.
router.post("/register", registerAdmin);

// Modify the openapi spec file
router.post("/map");

export default router;
