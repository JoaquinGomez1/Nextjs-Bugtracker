import User from "../../../controllers/user";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  if (req.method === "POST") {
    const result = await new User(req).login();

    console.log(result);
    if (result.status === "failed") return res.status(401).json(result);

    delete result.user_password;
    const token = jwt.sign(result, process.env.JWT_SECRET);
    const ONE_DAY = 3600 * 24; // In miliseconds
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: ONE_DAY,
    };
    res.setHeader("Set-Cookie", cookie.serialize("auth", token, cookieOptions));
    res.json({ message: "Auth granted", data: result });
  }
};
