import client from "../postgresql-client";

export default class Issues {
  constructor(req) {
    this.req = req;
  }

  async getIssue(id) {
    const query = `
        SELECT Issues.id, issue_name, issue_author as issue_author_id, issue_date, issue_project, issue_description, issue_severity, username as issue_author
        FROM Issues
        LEFT JOIN Users
        ON Users.id = issue_author
        WHERE Issues.id = $1 `;

    const queryResult = await client.query(query, [id]);
    if (queryResult?.rows?.length <= 0) {
      return { status: "failed", message: "Could not find that issue" };
    }
    return queryResult?.rows[0];
  }

  async addNewComment(user) {
    const data = this.req.body;
    const query = `
    INSERT INTO Comments(comment_content, comment_issue, comment_author)
    VALUES ($1, $2, $3) 
    RETURNING *
    `;

    const values = [data.content, data.issue, user.id];
    try {
      const result = await client.query(query, values);

      // Append the author user's id to allow the frontend to do authorization
      result.rows[0].comment_author_id = user.id;
      return result?.rows[0];
    } catch (err) {
      console.log(err);
      return { status: "failed", message: "Error" };
    }
  }

  async getComments() {
    const issueId = this.req.query.issue;

    const query = `
    SELECT comment_content, comment_issue, comment_date, comment_author as comment_author_id, username AS comment_author, Comments.id
    FROM Comments 
    LEFT JOIN Users 
    ON Users.id = comment_author
    WHERE comment_issue = $1
    ORDER BY comment_date DESC`;
    try {
      const result = await client.query(query, [issueId]);
      return result?.rows;
    } catch (err) {
      console.log(err);
      return { status: "failed", message: "issue id not found", issueId };
    }
  }
}
