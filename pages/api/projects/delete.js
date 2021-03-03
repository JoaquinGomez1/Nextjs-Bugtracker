import Project from "../../../controllers/projects";
import withProtect from "../../../middlewares/withProtect";

const handler = async (req, res) => {
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

export default withProtect(handler);
