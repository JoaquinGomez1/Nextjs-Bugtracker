import { useContext } from "react";
import { Container, Typography } from "@material-ui/core";
import Table from "../components/Table";
import { ProjectsContext } from "../context/projects";
import authenticatedRequest from "../libs/authRequest";
import { UserContext } from "../context/user";

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
  const result = await authenticatedRequest(ctx, "/user");

  if (!result || result.message) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const resultProjects = await authenticatedRequest(ctx, "/projects");

  return { props: { resultProjects } };
}
