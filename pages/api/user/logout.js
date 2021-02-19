import verifyJWT from "../../../middlewares/verifyJWT";
import { serialize } from "cookie";

export default async (req, res) => {
  // Log a user out
  if (req.method === "GET") {
    verifyJWT(req, res, (user) => {
      if (user) {
        res.setHeader(
          "Set-Cookie",
          serialize("auth", "", { maxAge: -1, path: "/" })
        );

        return res.json({ message: "User loged out" });
      } else {
        return res.status(400).json({ mesage: "something failed" });
      }
    });
  }
};
