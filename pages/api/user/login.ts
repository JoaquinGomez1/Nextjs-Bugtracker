import User from "../../../controllers/user";
import cookie, { CookieSerializeOptions } from "cookie";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const result = await new User(req).login();

    if ("status" in result && result.status === "failed")
      return res.status(401).json(result);

    if ("user_password" in result) {
      delete result.user_password;
    }

    const token = jwt.sign(result, process.env.JWT_SECRET ?? "");
    const ONE_DAY = 3600 * 24; // In miliseconds
    const cookieOptions: CookieSerializeOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: ONE_DAY,
    };
    res.setHeader("Set-Cookie", cookie.serialize("auth", token, cookieOptions));
    return res.json({ message: "Auth granted", data: result });
  }

  return res.status(404);
};
