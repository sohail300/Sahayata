"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.post("/sendotp", user_1.sendOTP);
router.post("/verifyotp", user_1.verifyOTP);
router.post("/emergency", user_1.postEmergencyCase);
router.get("/profile", user_1.getProfile);
router.put("/profile", user_1.updateProfile);
router.post("/contact", user_1.postContact);
// Modify the openapi spec file
router.post("/map");
exports.default = router;
