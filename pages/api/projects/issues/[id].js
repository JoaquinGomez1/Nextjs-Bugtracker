import Issue from "../../../../controllers/issues";
import verifyJWT from "../../../../middlewares/verifyJWT";

export default async function (req, res) {
  if (req.method === "GET") {
    const user = verifyJWT(req, res, (user) => ({ user }));
    if (user) {
      const issue = await new Issue(req).getIssue(req.query.id);
      if (issue.status !== "failed") return res.json(issue);
      else return res.status(404).json(issue);
    }
  }
}
