"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = exports.Emergency = exports.District = exports.Admin = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// MongoDB Schema
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    number: {
        type: String,
        require: true,
    },
    service_sid: {
        type: String,
    },
});
const adminSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    number: {
        type: String,
        require: true,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    worker: [
        {
            profession: String,
            quantity: Number,
        },
    ],
    available: {
        type: Boolean,
        default: true,
    },
    EmergencyCases: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Emergency" }],
});
const districtSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    number: {
        type: String,
        require: true,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    EmergencyCases: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Emergency" }],
});
const emergencySchema = new mongoose_1.default.Schema({
    name: String,
    number: String,
    latitude: Number,
    longitude: Number,
    cause: String,
    date: String,
    nearestCampId: String,
    solved: Boolean,
});
const contactSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
    },
    number: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    userId: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
});
// MongoDB Models
exports.User = mongoose_1.default.model("User", userSchema);
exports.Admin = mongoose_1.default.model("Admin", adminSchema);
exports.District = mongoose_1.default.model("District", districtSchema);
exports.Emergency = mongoose_1.default.model("Emergency", emergencySchema);
exports.Contact = mongoose_1.default.model("Contact", contactSchema);
