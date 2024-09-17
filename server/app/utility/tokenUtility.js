import { JWT_EXPIRY, JWT_KEY } from "../config/config.js";
import jwt from "jsonwebtoken";

export const TokenEncode = (username, user_id) => {
  const KEY = JWT_KEY;
  const EXPIRES_TOKEN = { expiresIn: JWT_EXPIRY };
  const PAY_LOAD = {
    username: username,
    user_id: user_id,
  };
  return jwt.sign(PAY_LOAD, KEY, EXPIRES_TOKEN);
};

export const TokenDecode = (token) => {
  try {
    return jwt.verify(token, JWT_KEY);
  } catch (error) {
    return error;
  }
};
