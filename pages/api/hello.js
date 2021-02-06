// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import postgre from "../../postgresql-client";

export default async (req, res) => {
  console.log(req);
  postgre.connect();
  postgre.query("SELECT * FROM USERS", (err, result) => {
    if (result && result.rows) res.json(result.rows);
    else res.json({ message: "Something failed" });
    postgre.end();
  });
};
