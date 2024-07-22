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
exports.mailer = mailer;
const schema_1 = require("../db/schema");
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const resend_1 = require("resend");
dotenv_1.default.config();
const resend = new resend_1.Resend(process.env.RESEND_KEY);
function mailer(email, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield schema_1.District.findOne({ email });
            const token = (0, uuid_1.v4)();
            if (user) {
                user.forgotPasswordVerifyToken = token;
                user.forgotPasswordExpiryDate = new Date(Date.now() + 60 * 60 * 1000);
                yield user.save();
                const { data, error } = yield resend.emails.send({
                    from: "Sahayta <contact@heysohail.me>",
                    to: email,
                    subject: "Reset Your Password",
                    html: `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td style="padding: 30px 10px 30px 40px; text-align: center;">
                            <h1 style="color: #f97316; margin: 0; font-size: 28px; font-weight: bold;">Sahayta</h1>
                            <p style="color: #047857; margin: 10px 0 30px; font-size: 16px;">Password Reset Request</p>
                            <p style="color: #333333; margin-bottom: 30px; font-size: 16px; line-height: 1.5;">Click the button below to reset your password:</p>
                            <a href="${process.env.FRONTEND_URL}/districtadmin/resetpassword/${token}" style="background-color: #10b981; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px;">Reset Your Password</a>
                            <p style="color: #666666; margin-top: 30px; font-size: 14px;">This link will expire in 1 hour. If you need to reset your password after that, please request a new reset link. If you didn't make this request, you can ignore this email.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                            <p style="color: #64748b; margin: 0; font-size: 14px;">If you're having trouble clicking the button, copy and paste this URL into your web browser:</p>
                            <p style="color: #0284c7; margin: 10px 0 0; font-size: 14px; word-break: break-all;">${process.env.FRONTEND_URL}/districtadmin/resetpassword/${token}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`,
                });
                if (error) {
                    return res.status(500).json({ msg: error, success: false });
                }
                console.log({ data });
            }
            else {
                return res.status(400).json({ msg: "User does not exist" });
            }
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err, success: false });
        }
    });
}
