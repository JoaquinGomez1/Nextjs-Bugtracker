import Project from "../../../controllers/projects";

export default function (req, res) {
  if (req.method === "POST") {
    new Project(req, res).viewIssues();
  }
}
