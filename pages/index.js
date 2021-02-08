import { useContext, useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import Table from "../components/Table";
import { ProjectsContext } from "../context/projects";
import { UserContext } from "../context/user";

export default function Index({ response }) {
  const { projects, setProjects } = useContext(ProjectsContext);
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const reqHeaders = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: currentUser.id }),
    };

    fetch("http://localhost:3000/api/projects", reqHeaders)
      .then((response) => response.json())
      .then((json) => {
        json.forEach((object) => {
          object.url = "/projects/" + `${object.id}`;
        });

        if (json && Array.isArray(json)) {
          setProjects(json);
          setIsLoading(false);
        }
      });
  }, []);

  if (response) setProjects(response);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" color="secondary">
        Welcome
      </Typography>
      <Table isLoading={isLoading} rows={projects} />
    </Container>
  );
}
