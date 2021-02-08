import Project from "../../../controllers/projects";

export default async function (req, res) {
  if (req.method === "POST") {
    const result = await new Project(req).viewIssues();
    return res.json(result.rows);
  }
}
