import { useContext } from "react";
import { Container, Typography } from "@material-ui/core";
import Table from "../components/Table";
import { ProjectsContext } from "../context/projects";

export default function Index() {
  const { projects } = useContext(ProjectsContext);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" color="secondary">
        Welcome
      </Typography>
      <Table rows={projects} />
    </Container>
  );
}
