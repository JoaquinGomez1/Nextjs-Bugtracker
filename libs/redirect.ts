import { NextPageContext } from "next";
import Router from "next/router";

export default function Redirect(ctx: NextPageContext, url: string) {
  if (ctx.res) {
    ctx.res.writeHead(303, { Location: url });
    ctx.res.end();
  } else {
    Router.replace(url);
  }
}
