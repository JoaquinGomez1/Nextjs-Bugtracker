import User from "../../../controllers/user";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  if (req.method === "POST") {
    const registerUser = await new User(req).register();

    if (registerUser?.status === "success") {
      delete registerUser.data.user_password;
      const token = jwt.sign(registerUser.data, process.env.JWT_SECRET);
      const ONE_DAY = 3600 * 24; // In miliseconds
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
        maxAge: ONE_DAY,
      };
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("auth", token, cookieOptions)
      );
      res.json(registerUser);
    } else return res.status(400).json(registerUser);
  }
};
