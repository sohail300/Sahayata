"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const admin_1 = require("../controllers/admin");
const router = express_1.default.Router();
router.post("/login", admin_1.adminLogin);
router.get("/profile", auth_1.authenticate, admin_1.adminProfile);
router.put("/profile", auth_1.authenticate, admin_1.editAdmin);
// Modify the openapi spec file
router.post("/map");
router.post("/search");
exports.default = router;
