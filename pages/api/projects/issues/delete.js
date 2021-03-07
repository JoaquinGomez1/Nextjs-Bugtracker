import withProtect from "../../../../middlewares/withProtect";
import Issue from "../../../../controllers/issues";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const issueId = req.body.id;
      console.log(issueId);
      const result = await new Issue(req).delete(issueId);

      if (result.status === "success") return res.json(result);
      else res.status(400).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Something went wrong while trying to delete an Issue",
      });
    }
  }
};

export default withProtect(handler);
