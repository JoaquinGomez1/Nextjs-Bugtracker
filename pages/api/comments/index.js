import Issue from "../../../controllers/issues";

export default async (req, res) => {
  if (req.method === "GET") {
    const result = await new Issue(req).getComments();
    if (Array.isArray(result)) {
      return res.json(result);
    } else {
      return res.status(400).json({
        message: "Something went wrong trying to get the comments",
        result,
      });
    }
  }
};
