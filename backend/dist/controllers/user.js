"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = sendOTP;
exports.verifyOTP = verifyOTP;
exports.postEmergencyCase = postEmergencyCase;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.postContact = postContact;
const axios_1 = __importDefault(require("axios"));
const schema_1 = require("../db/schema");
const userSchema_1 = require("../types/userSchema");
const getDate_1 = require("../utils/getDate");
const twilio_1 = __importDefault(require("twilio"));
const caseSchema_1 = require("../types/caseSchema");
const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const client = (0, twilio_1.default)(accountSid, authToken);
function sendOTP(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedInput = userSchema_1.sendOTPSchema.safeParse(req.body);
            if (parsedInput.success === false) {
                return res.status(401).json({
                    msg: parsedInput.error.issues[0],
                });
            }
            const { number } = parsedInput.data;
            const service = yield client.verify.v2.services.create({
                friendlyName: "RescueRadar Verify Service",
            });
            console.log(service.sid);
            const verification = yield client.verify.v2
                .services(service.sid)
                .verifications.create({ to: number, channel: "sms" });
            console.log(verification.status);
            const user = yield schema_1.User.findOne({ number });
            if (user) {
                user.service_sid = service.sid;
                yield user.save();
            }
            else {
                const obj = { number };
                const newUser = new schema_1.User(obj);
                yield newUser.save();
            }
            return res.status(200).json({ msg: "OTP sent successfully" });
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err });
        }
    });
}
function verifyOTP(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedInput = userSchema_1.verifyOTPSchema.safeParse(req.body);
            if (parsedInput.success === false) {
                return res.status(401).json({
                    msg: parsedInput.error.issues[0],
                });
            }
            const { otp, number } = parsedInput.data;
            const user = yield schema_1.User.findOne({ number });
            if (user) {
                const service_sid = user.service_sid;
                if (service_sid) {
                    const verification_check = yield client.verify.v2
                        .services(service_sid)
                        .verificationChecks.create({ to: number, code: otp });
                    console.log(verification_check.status);
                    res.status(200).send("OTP verified step");
                }
                else {
                    return res.status(400).json({ msg: "OTP cannot be verified" });
                }
            }
            else {
                return res.status(400).json({ msg: "User does not exist" });
            }
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err });
        }
    });
}
function getNearestCamp(latitude, longitude, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const originLatitude = latitude;
            const originLongitude = longitude;
            let min = Number.MAX_VALUE;
            let mincampId = "";
            const adminCamps = yield schema_1.Admin.find();
            adminCamps.forEach((camp) => __awaiter(this, void 0, void 0, function* () {
                const destinationLatitude = camp.latitude;
                const destinationLongitude = camp.longitude;
                const campId = camp._id;
                const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destinationLatitude},${destinationLongitude}&origins=${originLatitude},${originLongitude}&units=imperial&key=${process.env.GOOGLE_API}`;
                const response = yield axios_1.default.get(url);
                const dist = response.data.rows[0].elements[0].distance.text;
                let num = dist.replace(/[^\d.-]/g, "");
                if (min > num) {
                    min = num;
                    mincampId = String(campId);
                }
            }));
            console.log(mincampId);
            return mincampId;
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err });
        }
    });
}
function postEmergencyCase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = 12;
            const parsedInput = caseSchema_1.emergencyCaseSchema.safeParse(req.body);
            if (parsedInput.success === false) {
                return res.status(401).json({
                    msg: parsedInput.error.issues[0],
                });
            }
            const { cause, latitude, longitude } = parsedInput.data;
            const user = yield schema_1.User.findById(id);
            if (user) {
                let date = (0, getDate_1.getTodayDate)();
                const nearestCampId = yield getNearestCamp(latitude, longitude, res);
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
                const newEmergencyCase = new schema_1.Emergency(obj);
                yield newEmergencyCase.save();
                console.log("Emergency Case saved");
                res.status(201).json({ msg: "Success!" });
            }
            else {
                return res.status(400).json({ msg: "User does not exist" });
            }
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err });
        }
    });
}
function getProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            const user = yield schema_1.User.findById(id).select("name number");
            if (user) {
                return res.status(200).json({ user });
            }
            else {
                return res.status(400).json({ msg: "User does not exist" });
            }
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err });
        }
    });
}
function updateProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = 12;
            const parsedInput = userSchema_1.updateUserSchema.safeParse(req.body);
            if (parsedInput.success === false) {
                return res.status(401).json({
                    msg: parsedInput.error.issues[0],
                });
            }
            const { name } = parsedInput.data;
            const user = yield schema_1.User.findById(id);
            if (user) {
                user.name = name;
                yield user.save();
                return res.status(200).json({ msg: "Updated" });
            }
            else {
                return res.status(400).json({ msg: "User does not exist" });
            }
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err });
        }
    });
}
function postContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedInput = caseSchema_1.contactSchema.safeParse(req.body);
            if (parsedInput.success === false) {
                return res.status(401).json({
                    msg: parsedInput.error.issues[0],
                });
            }
            const { name, number, description, userId } = parsedInput.data;
            const user = yield schema_1.User.findOne({ number });
            if (user) {
                const obj = { name, number, description, userId };
                const newContact = new schema_1.Contact(obj);
                yield newContact.save();
                console.log("Contact saved");
                return res.status(201).json({ msg: "Success!" });
            }
            else {
                return res.status(400).json({ msg: "User does not exist" });
            }
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err });
        }
    });
}
