import Issue from "../../../controllers/issues";
import verifyJWT from "../../../middlewares/verifyJWT";

export default async (req, res) => {
  if (req.method === "POST") {
    const user = verifyJWT(req, res, (user) => user);
    if (user) {
      const newComment = await new Issue(req).addNewComment(user);
      if (newComment.status !== "failed") {
        return res.json({ ...newComment, comment_author: user.username });
      } else return res.status(400).json(newComment);
    }

    return res.status(401);
  }
};
