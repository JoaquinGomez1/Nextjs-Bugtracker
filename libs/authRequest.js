import headers from "../headers";
import fetch from "isomorphic-unfetch";

// handles initial data fetch both in the client side as well as SSR
export default async function authRequest(ctx, url) {
  if (ctx.req) {
    // Server side rendering
    const cookie = ctx.req.headers.cookie; // append cookie on SSR
    const URL = process.env.BACKEND_URL + url;
    const req = await fetch(URL, { ...headers, headers: { cookie: cookie } });
    const res = await req.json();

    return res;
  }
  // Not using an else statement in case we want to add more edge cases later
  if (!ctx.req) {
    // Client side rendering
    const URL = process.env.NEXT_PUBLIC_BACKEND_URL + url;
    const req = await fetch(URL);
    const res = await req.json();

    return res;
  }
}
