import client from "../postgresql-client";
import verifyJWT from "../middlewares/verifyJWT";

export default class Projects {
  constructor(req) {
    this.req = req;
  }

  // Returns all projects of a particular user
  async view(id) {
    // Create a query for the database
    const queryUserIsAuthor =
      "SELECT Projects.id, project_name, project_owner, project_members, username, user_role FROM Projects JOIN Users ON project_owner = Users.id WHERE Users.id = $1";

    const queryUserIsMember = `
    SELECT 
    project_id as id, user_id, user_role, project_name ,project_description, project_owner
    FROM Project_Users
        LEFT JOIN Projects
        ON Projects.id = Project_Users.project_id
        WHERE user_id = $1
        `;

    const projectsOwned = await client.query(queryUserIsAuthor, [id]);
    const projectsMember = await client.query(queryUserIsMember, [
      this.req.user.id,
    ]);

    const result = projectsMember.rows?.concat(projectsOwned.rows);
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

    if (!project) return [];

    project.project_members = members ? members : undefined;
    project.project_issues = issues;

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
  // First we delete tables with foreign keys pointing towards the project
  // And only then we delete given project
  async delete() {
    const { id } = this.req.body;
    const queryDeleteProjects = "DELETE FROM Projects WHERE Projects.id = $1";
    const queryDeleteIssues = "DELETE FROM Issues WHERE issue_project = $1";
    const queryDeleteUsers = "DELETE FROM Project_Users WHERE project_id = $1";

    await client.query(queryDeleteIssues, [id]);
    await client.query(queryDeleteUsers, [id]);
    const resultProjects = await client.query(queryDeleteProjects, [id]);

    return resultProjects;
  }

  //
  async createNewIssue(data) {
    let { title, description, severity, author, projectId } = data;
    if (!author) {
      const currentUserId = verifyJWT((user) => user.id);
      author = currentUserId;
    }
    const query = `
      INSERT INTO Issues(issue_name, issue_description, issue_severity, issue_author, issue_project)
      VALUES ($1, $2,$3,$4,$5) 
      RETURNING *
    `;
    const values = [title, description, severity, author, projectId];

    try {
      const result = await client.query(query, values);
      if (result.rows) return result.rows;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
