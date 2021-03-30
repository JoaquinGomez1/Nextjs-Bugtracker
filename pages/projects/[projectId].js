import { useState } from "react";
import { Container, Paper } from "@material-ui/core";
import IssuesList from "../../components/IssuesList";
import authenticatedRequest from "../../libs/authRequest";
import ProjectHeader from "../../components/ProjectHeader";
import { makeStyles } from "@material-ui/core/styles";

import { motion } from "framer-motion";
import { fadeIn as animations } from "../../libs/animations";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
}));

export default function ProjectPage({ projectData }) {
  const [project] = useState(projectData);
  const classes = useStyles();

  return (
    <motion.div
      key="page"
      variants={animations}
      style={{ transformOrigin: "top" }}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Container maxWidth="lg">
        <Paper className={classes.paper}>
          <ProjectHeader project={project} />
          <IssuesList
            projectIssues={project.project_issues}
            project={project}
          />
        </Paper>
      </Container>
    </motion.div>
  );
}

export async function getServerSideProps(ctx) {
  const projectData = await authenticatedRequest(
    ctx,
    `/projects/${ctx.query.projectId}`
  );
  // if there is a message it means something went wrong
  if (projectData.message)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return { props: { projectData } };
}
