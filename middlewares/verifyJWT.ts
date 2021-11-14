import cookie from "cookie";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import IUser from "../interfaces/user";

// Verifies and returns JWT's Data
export default function verifyJWT(
  req: NextApiRequest,
  res: NextApiResponse,
  cb: (verify: IUser) => any
) {
  if (req.cookies?.auth) {
    let tokenString = cookie.parse(req?.headers?.cookie!).auth;
    try {
      const verify: any = jwt.verify(tokenString, process.env.JWT_SECRET!);
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
