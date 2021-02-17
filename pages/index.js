import { useContext, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import Table from "../components/Table";
import { ProjectsContext } from "../context/projects";
import { UserContext } from "../context/user";
import fetch from "isomorphic-unfetch";
import headers from "../headers";
import { useRouter } from "next/router";

export default function Index({ resultProjects }) {
  const { projects, setProjects } = useContext(ProjectsContext);
  const { currentUser } = useContext(UserContext);
  const thereIsNoUserLoggedIn = Object.keys(currentUser).length <= 0;
  const router = useRouter();

  if (resultProjects) setProjects(resultProjects);

  useEffect(() => {
    if (thereIsNoUserLoggedIn && !resultProjects) router.push("/login");
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" color="secondary">
        Welcome
      </Typography>

      {!thereIsNoUserLoggedIn && <Table rows={projects} />}
    </Container>
  );
}

Index.getInitialProps = async (ctx) => {
  if (ctx.req) {
    // Server side rendering
    const cookie = ctx.req.headers.cookie; // append cookie in server side rendering
    const URL = process.env.BACKEND_URL + "/projects";
    const req = await fetch(URL, { ...headers, headers: { cookie: cookie } });
    const res = await req.json();

    return { resultProjects: res };
  }
  if (!ctx.req) {
    // Client side rendering
    const URL = process.env.BACKEND_URL + "/projects";
    const req = await fetch(URL);
    const res = await req.json();

    return { resultProjects: res };
  }
};
