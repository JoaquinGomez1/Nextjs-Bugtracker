import User from "../../../controllers/user";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import verifyJWT from "../../../middlewares/verifyJWT";

export default async (req, res) => {
  if (req.method === "POST") {
    const result = await new User(req).login();
    if (result.status === "failed" || !result[0])
      return res.status(401).json(result);

    delete result[0].user_password;
    const token = jwt.sign(result[0], process.env.JWT_SECRET);
    const ONE_DAY = 3600 * 24; // In miliseconds
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: ONE_DAY,
    };
    res.setHeader("Set-Cookie", cookie.serialize("auth", token, cookieOptions));
    res.json({ message: "Auth granted", data: result[0] });
  }

  // Returns user information if the user is logged in
  if (req.method === "GET") {
    verifyJWT(req, res, (user) => {
      res.json(user);
    });
  }
};
