import { httpService } from ".";
import IUser from "../interfaces/user";
import AppResponse from "../interfaces/appResponse";
import { useServiceState } from "../hooks/useService";

type AppUserResponse = IUser | AppResponse<string>;

/**Makes post request to log user in*/
export const logUser = (user: IUser) =>
  httpService<AppUserResponse>("/user/login", {
    body: JSON.stringify(user),
    method: "POST",
  });

/**Makes get request to log user out*/
export const logOutUser = () => httpService<AppUserResponse>("/user/logout");

/**Gets current logged in user*/
export const getCurrentUser = () => httpService<AppUserResponse>("/user");
