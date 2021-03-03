import Issue from "../../../../controllers/issues";
import withProtect from "../../../../middlewares/withProtect";

export default withProtect(async function (req, res) {
  if (req.method === "GET") {
    const issue = await new Issue(req).getIssue(req.query.id);
    if (issue.status !== "failed") return res.json(issue);
    else return res.status(404).json(issue);
  }
});
