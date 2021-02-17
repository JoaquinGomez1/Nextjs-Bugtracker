import verifyJWT from "../../../middlewares/verifyJWT";

export default async (req, res) => {
  // Returns user information if the user is logged in
  if (req.method === "GET") {
    verifyJWT(req, res, (user) => {
      res.json(user);
    });
  }
};
