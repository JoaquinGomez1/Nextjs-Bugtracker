import Issue from "../../../../controllers/issues";
import withProtect from "../../../../middlewares/withProtect";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { body: data } = req;
    try {
      const updateResult = await new Issue(req).updateDescription(data);
      if (updateResult.status !== "failed") return res.json(updateResult);
      else
        return res.status(500).json({
          message: "Something wrong happened trying to update an Issue",
        });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
};

export default withProtect(handler);
