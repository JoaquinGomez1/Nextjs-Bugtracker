import client from "../postgresql-client";

export default class Projects {
  constructor(req) {
    this.req = req;
  }

  // Returns all projects of a particular user
  async view(id) {
    // Create a query for the database
    const query =
      "SELECT Projects.id, project_name, project_owner, project_members, username, user_role FROM Projects JOIN Users ON project_owner = Users.id WHERE Users.id = $1";
    const result = await client.query(query, [id]);
    return result;
  }

  async viewById() {
    const id = this.req.query?.id;
    const query = `
      SELECT Projects.id, project_name,project_description, project_owner, project_members, username AS project_owner_name 
      FROM Projects 
      LEFT JOIN Users 
      ON Users.id = project_owner
      WHERE Projects.id = $1
      `;

    const queryResult = await client.query(query, [id]);
    const members = await this.getMembers(id);
    const issues = await this.getIssues(id);
    const project = queryResult.rows[0];
    project.project_members = members ? members : undefined;
    project.project_issues = issues;

    console.log(project);
    return project;
  }

  async getIssues(id) {
    const query = `SELECT * FROM Issues WHERE issue_project = $1`;
    const queryResult = await client.query(query, [id]);
    return queryResult?.rows;
  }

  // Returns a list of members of a particular project
  async getMembers(id) {
    const query = `
      SELECT user_id, username, Users.user_role FROM Project_Users
      LEFT JOIN Users
      ON Users.id = user_id
      WHERE Project_Users.project_id = $1
    `;
    const values = [id];
    const result = await client.query(query, values);

    return result?.rows;
  }

  // Returns all issues of a specific project
  async viewIssues() {
    const projectId = this.req.body.project_id;
    const query = "SELECT * FROM Issues WHERE issue_project = $1";
    const values = [projectId];

    const result = await client.query(query, values);
    return result;
  }

  // Adds one project to the projects table
  async addProject() {
    // takes an object with name, description, owner and members Int[] (user id) as parameter
    const { name, description, owner, members } = this.req.body;

    const greatestMemberIDQuery =
      "SELECT id FROM Users ORDER BY id DESC LIMIT 1";
    const greatestMemberID = await client.query(greatestMemberIDQuery);

    // Remove members that do not exist in the database yet
    const filteredMembers = [
      ...new Set(members.filter((id) => id <= greatestMemberID?.rows[0]?.id)),
    ];

    const query = `
    INSERT INTO 
    Projects(project_name, project_description, project_owner, project_members)
    VALUES($1, $2, $3, $4);
    `;
    const values = [name, description, owner, filteredMembers];
    const projectResult = await client.query(query, values);

    const insertIntoJoiningTable = `
      INSERT INTO Project_Users(project_id, user_id)
      SELECT Projects.id as project_id, Users.id as user_id 
      FROM Users 
      LEFT JOIN Projects 
      ON Users.id = ANY (Projects.project_members)
      WHERE projects.id = (
          SELECT id from PROJECTS 
          ORDER BY id DESC 
          LIMIT 1
    );
    `;
    try {
      client.query(insertIntoJoiningTable);
    } catch (err) {
      console.log(err);
    }

    return projectResult;
  }

  // Deletes one project from the table
  async delete() {
    const { id } = this.req.body;
    const query = "DELETE FROM Projects WHERE Projects.id = $1";
    const result = await client.query(query, [id]);
    return result;
  }

  //
  async createNewIssue(data) {
    const { title, description, severity, author, projectId } = data;
    const query = `
      INSERT INTO Issues(issue_name, issue_description, issue_severity, issue_author, issue_project)
      VALUES ($1, $2,$3,$4,$5)
    `;
    const values = [title, description, severity, author, projectId];

    try {
      const result = await client.query(query, values);
      if (result.rows) return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
