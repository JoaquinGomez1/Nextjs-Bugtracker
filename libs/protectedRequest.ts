import { NextPageContext } from "next";
import AppResponse from "../interfaces/appResponse";
import requestWithCredentials from "./authRequest";

export default async function protectedRequest(
  ctx: NextPageContext,
  redirectUrl: string
) {
  const result = await requestWithCredentials<AppResponse>(ctx, "/user");

  if (!result || result.message) {
    return {
      redirect: {
        destination: redirectUrl,
        permanent: false,
      },
    };
  } else return { auth: true };
}
