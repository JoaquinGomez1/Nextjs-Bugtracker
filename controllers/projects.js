import client from "../postgresql-client";

export default class Projects {
  constructor(req) {
    this.req = req;
  }

  // Returns all projects of a particular user
  async view() {
    // Create a query for the database
    const query =
      "SELECT Projects.id,project_name,project_owner,username, user_role FROM Projects JOIN Users ON project_owner = Users.id WHERE Users.id = $1";
    const values = [this.req.body.user_id];

    const result = await client.query(query, values);
    return result;
  }

  // Returns all issues of a specific project
  async viewIssues() {
    const projectId = this.req.body.project_id;
    const query = "SELECT * FROM Issues WHERE issue_project = $1";
    const values = [projectId];

    const result = await client.query(query, values);
    return result;
  }

  async addProject() {
    // takes an object with name, description and owner (user id) as parameter
    const { name, description, owner } = this.req.body;
    const query =
      "INSERT INTO Projects(project_name, project_description, project_owner) VALUES($1, $2, $3)";
    const values = [name, description, parseInt(owner)];

    return await client.query(query, values);
  }
}
