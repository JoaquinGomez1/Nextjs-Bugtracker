import Project from "../../../controllers/projects";
import verifyJWT from "../../../middlewares/verifyJWT";

export default async function (req, res) {
  // View Projects from user
  if (req.method === "GET") {
    verifyJWT(req, res, async ({ id }) => {
      const response = await new Project(req).view(id);
      if (!response)
        return res.status(500).json({ message: "Something went wrong" });

      return res.status(200).json(response.rows);
    });
  }

  // Add a project to a user
  if (req.method === "PUT") {
    const response = await new Project(req).addProject();
    return res.status(200).json(response.rows);
  }
}
