import nodemailer from "nodemailer";
import {
  EMAIL_HOST,
  EMAIL_PASS,
  EMAIL_PORT,
  EMAIL_USER,
  SERVICE,
} from "../config/config.js";

export const transporter = nodemailer.createTransport({
  service: SERVICE,
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_PORT, // true for port 465, false for other ports
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});
