import bcrypt from "bcrypt";
import client from "../postgresql-client";

export default class User {
  constructor(req) {
    this.req = req;
  }

  async login() {
    if (!this.req || !this.req.body)
      return { message: "No body", status: "failed" };
    const { username, password } = this.req.body;
    if (!username || !password)
      return { message: "No username/password", status: "failed" };

    const queryResult = await client.query(
      "SELECT id, username, user_password, user_role FROM Users WHERE username = $1",
      [username]
    );
    const userFound = queryResult.rows;
    if (!userFound || userFound.length <= 0)
      return { message: "User not found", status: "failed" };

    const thereIsAMatch = password === userFound[0].user_password;

    if (!thereIsAMatch)
      return { status: "failed", message: "Password does not match" };
    else return userFound;
  }
}
