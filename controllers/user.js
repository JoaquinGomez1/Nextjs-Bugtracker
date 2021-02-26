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

    const userFoundPassword = userFound[0].user_password;
    const encryptedPasswordMatches = await bcrypt.compare(
      password,
      userFoundPassword
    );
    const thereIsAMatch =
      password === userFoundPassword || encryptedPasswordMatches;

    if (!thereIsAMatch)
      return { status: "failed", message: "Password does not match" };
    else return userFound;
  }

  async register() {
    if (!this.req || !this.req.body)
      return { message: "No body", status: "failed" };
    const user = this.req.body;
    const thereAreEmptyFields = Object(user).keys().length <= 0;

    if (thereAreEmptyFields) return { status: "failed", message: "Empty body" };
    if (user.password !== user.confirmPassword)
      return { status: "failed", message: "Passwords do not match" };

    const userNameExistsQuery = "SELECT * FROM Users WHERE username = $1";
    const userNameExistResult = await client.query(userNameExistsQuery, [
      user.username,
    ]);
    const userNameDoesExist = userNameExistResult?.rows?.length >= 0;

    if (userNameDoesExist)
      return { status: "failed", message: "Username already exists" };

    const encryptedPassword = await bcrypt.hash(user.password, 10);

    const registerQuery =
      "INSERT INTO Users(username, user_password, user_name) VALUES($1,$2,$3)";
    const registerQueryValues = [
      user.username,
      encryptedPassword,
      user.user_name,
    ];

    try {
      client.query(registerQuery, registerQueryValues);
      return { status: "success", message: "User registered succesfully" };
    } catch (err) {
      console.log(err);
    }
  }
}
