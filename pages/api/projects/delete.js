import Project from "../../../controllers/projects";

export default async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const deleteProject = new Project(req).delete();
      return res.json(deleteProject.rows);
    } catch (err) {
      return res.status(500).json({
        message: "Something went wrong while trying to delete this project",
      });
    }
  }
};
