import Issue from "../../../controllers/issues";

export default async (req, res) => {
  console.log("hit");
  if (req.method === "GET") {
    const result = await new Issue(req).getComments();
    console.log(result);
    if (Array.isArray(result)) {
      return res.json(result);
    } else return res.status(400).json({ message: "Something went wrong" });
  }
};
