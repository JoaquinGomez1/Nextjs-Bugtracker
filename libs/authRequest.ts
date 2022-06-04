import headers from "../headers";
import fetch from "isomorphic-unfetch";
import { NextPageContext } from "next";
import AppResponse from "../interfaces/appResponse";

// handles initial data fetch both in the client side as well as SSR
export default async function authRequest<T>(
  ctx: NextPageContext,
  url: string
): Promise<T | AppResponse | undefined> {
  if (ctx.req) {
    // Server side rendering
    const cookie = ctx.req.headers.cookie; // append cookie on SSR
    const URL = process.env.BACKEND_URL + url;
    const req = await fetch(URL, { headers: { cookie: cookie! } });
    if (req.status !== 200)
      return { message: "Invalid request", status: `${req.status}` };
    const res: T = await req.json();

    return res;
  }
  // Not using an else statement in case we want to add more edge cases later
  if (!ctx.req) {
    // Client side rendering
    const URL = process.env.NEXT_PUBLIC_BACKEND_URL + url;
    const req = await fetch(URL);
    if (req.status !== 200)
      return { message: "Invalid request", status: `${req.status}` };
    const res: T = await req.json();

    return res;
  }

  return undefined;
}
