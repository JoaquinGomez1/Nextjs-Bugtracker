import Project from "../../../controllers/projects";
import withProtect from "../../../middlewares/withProtect";

async function handler(req, res) {
  // View Projects from user
  if (req.method === "GET") {
    const response = await new Project(req).view(req.user.id);
    if (!response)
      return res.status(500).json({ message: "Something went wrong" });

    return res.status(200).json(response.rows);
  }

  // Add a project to a user
  if (req.method === "PUT") {
    const response = await new Project(req).addProject();
    return res.status(200).json(response.rows);
  }
}
export default withProtect(handler);
