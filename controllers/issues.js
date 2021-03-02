import client from "../postgresql-client";

export default class Issues {
  constructor(req) {
    this.req = req;
  }

  async getIssue(id) {
    const query = `
        SELECT * 
        FROM Issues
        WHERE id = $1 `;

    const queryResult = await client.query(query, [id]);
    if (queryResult?.rows?.length <= 0) {
      return { status: "failed", message: "Could not find that issue" };
    }
    return queryResult?.rows[0];
  }
}
