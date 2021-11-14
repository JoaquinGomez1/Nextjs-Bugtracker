import { NextApiRequest } from "next";
import IUser from "../interfaces/user";
import client from "../postgresql-client";

export default class Issues {
  constructor(private req: NextApiRequest) {}

  async getIssue(id: number) {
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

  async addNewComment(user: IUser) {
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
      return result.rows;
    } catch (err) {
      console.log(err);
      return { status: "failed", message: "issue id not found", issueId };
    }
  }

  async deleteComment(id: number) {
    const query = `DELETE FROM Comments WHERE id = $1 AND (comment_author = $2 OR $3 = 'admin')`;

    try {
      const result = await client.query(query, [
        id,
        this.req.user?.id,
        this.req.user?.user_role,
      ]);
      if (result.fields)
        return { status: "success", message: "Comment deleted successfully" };
      else return { status: "failed", message: "Failed to delete the comment" };
    } catch (err) {
      console.log(err);
    }
  }

  // TODO: Assign proper data type
  async updateDescription(data: any) {
    if (!data) return { status: "failed", message: "No data" };
    if (!data.issueId) return { status: "failed", message: "No id provided" };

    const thereIsOneUndefinedValue = Object.values(data).some(
      (value) => !value
    );
    if (thereIsOneUndefinedValue)
      return { message: "Empty values are not allowed", status: "failed" };

    const query = `UPDATE Issues SET issue_description = $1 WHERE id = $2`;
    const values = [data.fieldValue, data.issueId];
    const result = await client.query(query, values);
    return result.rows;
  }

  async delete(id: number) {
    const query = `DELETE FROM Issues WHERE id = $1 AND (issue_author = $2 OR $3 = 'admin')`;
    const queryComments = `DELETE FROM Comments WHERE comment_issue = $1`;
    try {
      await client.query(queryComments, [id]);
      const result = await client.query(query, [
        id,
        this.req.user?.id,
        this.req.user?.user_role,
      ]);
      if (result.fields)
        return { status: "success", message: "Issue deleted successfully" };
      else return { status: "failed", message: "Failed to delete the Issue" };
    } catch (err) {
      console.log(err);
    }
  }
}
