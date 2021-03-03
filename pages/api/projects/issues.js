import Project from "../../../controllers/projects";
import withProtect from "../../../middlewares/withProtect";

async function handler(req, res) {
  if (req.method === "POST") {
    const result = await new Project(req).viewIssues();
    return res.json(result.rows);
  }
}

export default withProtect(handler);
