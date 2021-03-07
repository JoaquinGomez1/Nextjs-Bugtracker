import withProtect from "../../../../middlewares/withProtect";
import Users from "../../../../controllers/user";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const { projectId, userId } = req.body; // project to delete the user from
      const result = await new Users(req).deleteMember(projectId, userId);

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
