import Project from "../../../../controllers/projects";
import withProtect from "../../../../middlewares/withProtect";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { body: data } = req;
    const issueWasCreated = await new Project(req).createNewIssue(data);

    if (issueWasCreated)
      return res.json({ message: "Issue was created", issue: issueWasCreated });
    else return res.status(500).json({ message: "Something wrong happened" });
  }
};

export default withProtect(handler);
