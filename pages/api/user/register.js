import User from "../../../controllers/user";

export default async (req, res) => {
  if (req.method === "POST") {
    const registerUser = await User(req).register();
    if (registerUser?.status === "success") {
      res.json(registerUser.message);
    } else return res.status(400).json(registerUser.message);
  }
};
