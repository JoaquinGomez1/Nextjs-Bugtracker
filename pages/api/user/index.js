import withProtect from "../../../middlewares/withProtect";

const handler = async (req, res) => {
  // Returns user information if the user is logged in
  if (req.method === "GET") {
    res.json(req.user);
  }
};

export default withProtect(handler);
