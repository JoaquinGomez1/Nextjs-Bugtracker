import { useContext } from "react";
import { Container, Typography } from "@material-ui/core";
import Table from "../components/Table";
import { ProjectsContext } from "../context/projects";
import { UserContext } from "../context/user";

import authenticatedRequest from "../libs/authRequest";
import protectedRequest from "../libs/protectedRequest";

export default function Index({ resultProjects }) {
  const { projects, setProjects } = useContext(ProjectsContext);
  const { currentUser } = useContext(UserContext);
  const thereIsNoUserLoggedIn =
    currentUser && Object.keys(currentUser).length <= 0;

  if (resultProjects) setProjects(resultProjects);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" color="secondary">
        Welcome
      </Typography>

      {!thereIsNoUserLoggedIn && <Table rows={projects} />}
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const result = await protectedRequest(ctx, "/login");

  const resultProjects = await authenticatedRequest(ctx, "/projects");

  if (!result.auth) return result;
  return { props: { resultProjects } };
}
