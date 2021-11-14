import bcrypt from "bcrypt";
import { NextApiRequest } from "next";
import AppResponse from "../interfaces/appResponse";
import LoginUserDto from "../interfaces/loginUserDto";
import IUser from "../interfaces/user";
import client from "../postgresql-client";

export default class User {
  constructor(private req: NextApiRequest) {}

  async login(): Promise<IUser | AppResponse> {
    if (!this.req || !this.req?.body)
      return { message: "No body", status: "failed" };

    const { username, password }: LoginUserDto = this.req.body;
    console.log({ username, password });

    if (!username || !password)
      return { message: "No username/password", status: "failed" };

    const queryResult = await client.query(
      "SELECT id, username, user_password, user_role FROM Users WHERE username = $1",
      [username]
    );
    const userFound: IUser | undefined = queryResult.rows[0];
    if (!userFound) return { message: "User not found", status: "failed" };

    const userFoundPassword = userFound.user_password;

    const encryptedPasswordMatches = await bcrypt.compare(
      password,
      userFoundPassword!
    );

    const thereIsAMatch =
      password === userFoundPassword || encryptedPasswordMatches;

    if (!thereIsAMatch)
      return { status: "failed", message: "Password does not match" };
    else return userFound;
  }

  async register(): Promise<IUser | AppResponse<IUser>> {
    if (!this.req || !this.req.body)
      return { message: "No body", status: "failed" };
    const user = this.req.body;
    const thereAreEmptyFields = Object.values(user).some((field) => !field);

    if (thereAreEmptyFields) return { status: "failed", message: "Empty body" };
    if (user.password !== user.confirmPassword)
      return { status: "failed", message: "Passwords do not match" };

    const userNameExistsQuery = "SELECT * FROM Users WHERE username = $1";
    const userNameExistResult = await client.query(userNameExistsQuery, [
      user.username,
    ]);
    const userNameDoesExist = userNameExistResult?.rows?.length >= 1;

    if (userNameDoesExist)
      return { status: "failed", message: "Username already exists" };

    const encryptedPassword = await bcrypt.hash(user.password, 10);

    const registerQuery =
      "INSERT INTO Users(username, user_password, user_name, user_role) VALUES($1,$2,$3, 'member') RETURNING *";
    const registerQueryValues = [
      user.username,
      encryptedPassword,
      user.user_name,
    ];

    try {
      const result = await client.query(registerQuery, registerQueryValues);
      const rows: IUser[] = result.rows;
      return {
        status: "success",
        message: "User registered succesfully",
        data: rows[0],
      };
    } catch (err) {
      return { status: "failed", message: `${err}` };
    }
  }

  async deleteMember(projectId: number, userId: number): Promise<AppResponse> {
    const query = `DELETE FROM Project_Users WHERE project_id = $1 AND user_id = $2 AND $3 = 'admin'`;

    try {
      const result = await client.query(query, [
        projectId,
        userId,
        this.req.user?.user_role,
      ]);
      if (result.fields)
        return { status: "success", message: "Issue deleted successfully" };
      else return { status: "failed", message: "Failed to delete the Issue" };
    } catch (err) {
      return {
        status: "failed",
        message: "Failed to delete the Issue for internal reasons",
      };
    }
  }

  async getAllUsersByName(name: string): Promise<IUser[]> {
    const query = `
    SELECT username, id 
    FROM Users
    WHERE username ILIKE $1
    LIMIT 10
    `;
    const result = await client.query(query, [name + "%"]);

    return result.rows;
  }
}
