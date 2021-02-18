import Project from "../../../controllers/projects";
import verifyJWT from "../../../middlewares/verifyJWT";

export default async function (req, res) {
  // View Projects from user
  if (req.method === "GET") {
    verifyJWT(req, res, async ({ id }) => {
      const response = await new Project(req).view(id);
      if (!response || response.rows.length <= 0)
        return res.status(400).json({ message: "No result" });

      return res.status(200).json(response.rows);
    });
  }

  // Add a project to a user
  if (req.method === "PUT") {
    const response = await new Project(req).addProject();
    return res.status(200).json(response.rows);
  }
}
