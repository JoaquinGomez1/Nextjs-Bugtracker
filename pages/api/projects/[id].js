import Project from "../../../controllers/projects";
import withProtect from "../../../middlewares/withProtect";

async function handler(req, res) {
  if (req.method === "GET") {
    const result = await new Project(req).viewById();

    if (result?.length <= 0)
      return res.status(404).json({ message: "Project does not exists" });
    const userIsMember =
      result.project_members?.find(({ user_id }) => user_id === req.user.id) ||
      result?.project_owner == req.user.id;

    if (userIsMember) return res.json(result);
    else return res.status(403).json({ message: "Unauthorized" });
  }
}

export default withProtect(handler);
