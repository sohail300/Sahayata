"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const district_1 = require("../controllers/district");
const router = express_1.default.Router();
router.post("/login", district_1.districtAdminLogin);
router.get("/emergency", district_1.getEmergency);
// It registers the Admin, not for the District Admin registration.
router.post("/register", district_1.registerAdmin);
// Modify the openapi spec file
router.post("/map");
exports.default = router;
