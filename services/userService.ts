import { httpService } from ".";
import IUser from "../interfaces/user";
import AppResponse from "../interfaces/appResponse";

type AppUserResponse = AppResponse<IUser>;
type UserLogin = { username: string; password: string };

/**Makes post request to log user in*/
export const logInUser = (user: UserLogin) =>
  httpService<AppUserResponse>("/user/login", {
    body: JSON.stringify(user),
    method: "POST",
  });

/**Makes get request to log user out*/
export const logOutUser = () => httpService<AppUserResponse>("/user/logout");

/**Gets current logged in user*/
export const getCurrentUser = () => httpService<AppUserResponse>("/user");
