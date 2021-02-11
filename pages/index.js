import { useContext } from "react";
import { Container, Typography } from "@material-ui/core";
import Table from "../components/Table";
import { ProjectsContext } from "../context/projects";
import fetch from "isomorphic-unfetch";
import headers from "../headers";

export default function Index({ resultProjects }) {
  const { projects, setProjects } = useContext(ProjectsContext);

  if (resultProjects) setProjects(resultProjects);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" color="secondary">
        Welcome
      </Typography>
      <Table rows={projects} />
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
  } else {
    // Client side rendering
    const URL = process.env.BACKEND_URL + "/projects";
    const req = await fetch(URL);
    const res = await req.json();

    return { resultProjects: res };
  }
};
