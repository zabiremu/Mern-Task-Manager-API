import { EMAIL_USER } from "../config/config.js";
import USER_MODEL from "../models/UserModel.js";
import { transporter } from "../utility/emailUtility.js";
import { TokenEncode } from "../utility/tokenUtility.js";

export const Registration = async (req, res) => {
  try {
    const reqBody = req.body;
    const user = await USER_MODEL.create(reqBody);
    return res.status(201).json({
      status: "success",
      message: "User registration successfully 11",
    });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error });
  }
};

export const Login = async (req, res) => {
  try {
    const reqBody = req.body;
    const user = await USER_MODEL.findOne(reqBody);
    if (user === null) {
      return res.status(401).json({
        status: "fail",
        message:
          "Invalid credentials. Please check your user_name and password and try again.",
      });
    }
    const token = TokenEncode(user["username"], user["_id"]);
    user.token = token;
    req.header.username = user.username;
    req.header.user_id = user._id;
    return res.status(200).json({
      status: "success",
      data: { token: token, user: user },
      message: "user login successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error });
  }
};

export const ProfileDetails = async (req, res) => {
  try {
    const user = req.headers["user_id"];
    const userProfile = await USER_MODEL.findById(user);
    return res.json({ status: "success", data: userProfile });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error });
  }
};

export const ProfileUpdate = async (req, res) => {
  try {
    const user = req.headers["user_id"];
    const userProfile = await USER_MODEL.findByIdAndUpdate(user, req.body);
    return res.json({ status: "success", message: "user profile updated" });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error });
  }
};

export const EmailVerify = async (req, res) => {
  const user = await USER_MODEL.findOne({ username: req.body.username });

  if (user === null) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid credentials. Please check your user name try again.",
    });
  }
  const generateCode = Math.floor(100000 + Math.random() * 900000);
  const mailOptions = {
    from: EMAIL_USER,
    to: "zabirraihan570@gmailcom",
    subject: "Email Verification",
    text: `Your verification code is ${generateCode}`,
  };

  transporter.sendMail(mailOptions);
  const userProfileUpdate = await USER_MODEL.findByIdAndUpdate(user._id, {
    otp: generateCode,
  });
  return res.json({
    status: "success",
    message: "Your verification code is sent",
  });
};

export const CodeVerify = async (req, res) => {
  const user = await USER_MODEL.findOne({ username: req.body.username });
  if (user === null) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid credentials. Please check your user name try again.",
    });
  }

  if (user.otp !== req.body.otp) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid credentials. Please check your otp try again.",
    });
  }

  const userProfileUpdate = await USER_MODEL.findByIdAndUpdate(user._id, {
    otpVerified: 1,
  });
  return res.json({
    status: "success",
    message: "Your account verified successfully",
  });
};

export const ResetPassword = async (req, res) => {
  const user = await USER_MODEL.findOne({ username: req.body.username });
  if (user === null) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid credentials. Please check your user name try again.",
    });
  }

  const userProfileUpdate = await USER_MODEL.findByIdAndUpdate(user._id, {
    password: req.body.password,
  });
  return res.json({
    status: "success",
    message: "password reset successfully",
  });

  return res.json({ status: "success" });
};
