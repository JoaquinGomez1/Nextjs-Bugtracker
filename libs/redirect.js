import Router from "next/router";

export default function Redirect(ctx, url) {
  if (ctx.res) {
    ctx.res.writeHead(303, { Location: url });
    ctx.res.end();
  } else {
    Router.replace(url);
  }
}
