import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

// Verifies if the user is logged in and if the jwt is valid
const withProtect =
  (handler: (req: NextApiRequest, res: NextApiResponse) => any) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    if (req.cookies?.auth) {
      let tokenString = cookie.parse(req.headers.cookie!).auth;
      try {
        const verify: any = jwt.verify(tokenString, process.env.JWT_SECRET!);

        req.user = verify;

        return handler(req, res);
      } catch (err) {
        return res
          .status(500)
          .json({ message: "Something went wrong", errorCode: err });
      }
    } else {
      return res.status(400).json({ message: "You must be logged in" });
    }
  };

export default withProtect;
