import Project from "../../../../controllers/projects";

export default async (req, res) => {
  if (req.method === "PUT") {
    const { body: data } = req;
    const issueWasCreated = await new Project(req).createNewIssue(data);
    if (issueWasCreated) return res.json({ message: "Issue was created" });
    else return res.status(500).json({ message: "Something wrong happened" });
  }
};