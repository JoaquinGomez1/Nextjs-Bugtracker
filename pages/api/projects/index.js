import Project from "../../../controllers/projects";

export default async function (req, res) {
  if (req.method === "POST") {
    const response = await new Project(req).view();
    return res.json(response.rows);
  }

  if (req.method === "PUT") {
    const response = await new Project(req).addProject();
    return res.json(response.rows);
  }
}
