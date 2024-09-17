import { TokenDecode } from "../utility/tokenUtility.js";

export default (req, res, next) => {
  let token = req.headers["token"];
  let decode = TokenDecode(token);

  if (decode === null) {
    return res.status(401).json({
      status: "fail",
      message: "unauthorized access",
    });
  } else {
    req.headers.username = decode.username;
    req.headers.user_id = decode.user_id;

    next();
  }
};
