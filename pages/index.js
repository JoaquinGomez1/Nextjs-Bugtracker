import { useContext, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import Table from "../components/Table";
import { ProjectsContext } from "../context/projects";
import { UserContext } from "../context/user";

import authenticatedRequest from "../libs/authRequest";
import protectedRequest from "../libs/protectedRequest";

import headers from "../headers";

export default function Index({ resultProjects }) {
  const { projects, setProjects } = useContext(ProjectsContext);
  const { currentUser } = useContext(UserContext);
  const thereIsNoUserLoggedIn =
    currentUser && Object.keys(currentUser).length <= 0;

  useEffect(() => {
    if (resultProjects) setProjects(resultProjects);
  }, [resultProjects]);

  const handleDeleteProject = async (id, index) => {
    const reqHeaders = headers;
    reqHeaders.method = "DELETE";
    reqHeaders.body = JSON.stringify({ id });

    const req = await fetch(
      process.env.BACKEND_URL + "/projects/delete",
      reqHeaders
    );

    if (req.status === 200) {
      const projectsCopy = [...projects];
      projectsCopy.splice(index, 1);
      setProjects(projectsCopy);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" color="secondary">
        Welcome
      </Typography>

      {!thereIsNoUserLoggedIn && (
        <Table handleDeleteProject={handleDeleteProject} rows={projects} />
      )}
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const result = await protectedRequest(ctx, "/login");

  const resultProjects = await authenticatedRequest(ctx, "/projects");

  if (!result.auth) return result;
  return { props: { resultProjects } };
}
