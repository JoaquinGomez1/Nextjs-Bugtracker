import withProtect from "../../../middlewares/withProtect";
import User from "../../../controllers/user";

const handler = async (req, res) => {
  if (req.method === "GET" && req.query.name) {
    const result = await new User(req).getAllUsersByName(req.query.name);
    return res.json(result);
  }
  // Returns user information if the user is logged in
  if (req.method === "GET") {
    return res.json(req.user);
  }
};

export default withProtect(handler);
