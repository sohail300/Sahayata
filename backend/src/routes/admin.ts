import express from "express";
import { authenticate } from "../middleware/auth";
import { adminLogin, adminProfile, editAdmin } from "../controllers/admin";

const router = express.Router();

router.post("/login", adminLogin);

router.get("/profile", authenticate, adminProfile);

router.put("/profile", authenticate, editAdmin);

// Modify the openapi spec file
router.post("/map");

router.post("/search");

export default router;
