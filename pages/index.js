import { useContext, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import Table from "../components/Table";
import { ProjectsContext } from "../context/projects";
import { UserContext } from "../context/user";

import authenticatedRequest from "../libs/authRequest";
import protectedRequest from "../libs/protectedRequest";

import headers from "../headers";
import { motion } from "framer-motion";
import { fadeIn } from "../libs/animations";

const MotionContainer = motion(Container);

export default function Index({ resultProjects }) {
  console.log(resultProjects);
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
    <MotionContainer
      variants={fadeIn}
      animate="show"
      initial="hidden"
      exit="exit"
      maxWidth="lg"
    >
      <Typography variant="h2" style={{ margin: "24px 0" }}>
        Welcome {currentUser.username}
      </Typography>

      {!thereIsNoUserLoggedIn && (
        <Table handleDeleteProject={handleDeleteProject} rows={projects} />
      )}
    </MotionContainer>
  );
}

export async function getServerSideProps(ctx) {
  const result = await protectedRequest(ctx, "/login");

  const resultProjects = await authenticatedRequest(ctx, "/projects");

  if (!result.auth) return result;
  return { props: { resultProjects } };
}
