import cookie from "cookie";
import jwt from "jsonwebtoken";

// Verifies and returns JWT's Data
export default function verifyJWT(req, res, cb) {
  if (req.cookies.auth) {
    let tokenString = cookie.parse(req.headers.cookie).auth;
    try {
      const verify = jwt.verify(tokenString, process.env.JWT_SECRET);
      return cb(verify);
    } catch (JsonWebTokenError) {
      return res
        .status(400)
        .json({ message: "Invalid signature", errorCode: JsonWebTokenError });
    }
  } else {
    return res.status(400).json({ message: "You must be logged in" });
  }
}
