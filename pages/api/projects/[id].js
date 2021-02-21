import Project from "../../../controllers/projects";
import verifyJWT from "../../../middlewares/verifyJWT";

export default async function (req, res) {
  if (req.method === "GET") {
    const user = verifyJWT(req, res, (user) => user);
    if (user) {
      const result = await new Project(req).viewById();

      if (result?.length <= 0)
        return res.status(404).json({ message: "Project does not exists" });
      const userIsMember =
        result.project_members?.find(({ user_id }) => user_id === user.id) ||
        result?.project_owner == user.id;

      if (userIsMember) return res.json(result);
      else return res.status(403).json({ message: "Unauthorized" });
    }
  }
}
