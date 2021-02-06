import pool from "../postgresql-client";

export default class Projects {
  constructor(req, res) {
    (this.req = req), (this.res = res);
  }

  // Returns all projects of a particular user
  view() {
    // Create a query for the database
    const query =
      "SELECT Projects.id,project_name,project_owner,username, user_role FROM Projects JOIN Users ON project_owner = Users.id WHERE Users.id = $1";
    const values = [this.req.body.user_id];

    pool.query(query, values, (err, result) => {
      if (err) console.error(err);
      else {
        this.res.json(result.rows);
      }
    });
  }

  // Returns all issues of a specific project
  viewIssues() {
    const projectId = this.req.body.project_id;
    const query = "SELECT * FROM Issues WHERE issue_project = $1";
    const values = [projectId];

    pool.query(query, values, (err, result) => {
      if (err) throw new Error(err);
      else {
        this.res.json(result.rows);
      }
    });
  }

  addProject() {
    // takes an object with name, description and owner (user id) as parameter
    const { name, description, owner } = this.req.body;
    const query =
      "INSERT INTO Projects(project_name, project_description, project_owner) VALUES($1, $2, $3)";
    const values = [name, description, parseInt(owner)];

    pool.query(query, values, (err, result) => {
      if (err) throw new Error(err);
      else {
        this.res.json(result.rows);
      }
    });
  }
}
