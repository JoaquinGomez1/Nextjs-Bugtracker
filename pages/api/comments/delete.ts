import withProtect from "../../../middlewares/withProtect";
import Issue from "../../../controllers/issues";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    try {
      const body = JSON.parse(req.body);
      const commentId = body.id;
      const result: any = await new Issue(req).deleteComment(commentId);

      if (result.status === "success") return res.json(result);
      else res.status(400).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Something went wrong while trying to delete a comment",
      });
    }
  }
};

export default withProtect(handler);
