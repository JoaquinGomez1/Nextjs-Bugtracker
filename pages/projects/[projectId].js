import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Divider,
  Box,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import NewIssueModal from "../../components/NewIssueModal";
import Issue from "../../components/Issue";

import headers from "../../headers";
import { motion } from "framer-motion";
import { fadeIn as animations } from "../../libs/animations";

import authenticatedRequest from "../../libs/authRequest";
import UpdateMembersModal from "../../components/UpdateMembersModal";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  title: {
    padding: "10px",
    marginBottom: theme.spacing(4),
  },
  subtitle: {
    marginBottom: theme.spacing(2),
  },
}));

export default function ProjectPage({ projectData }) {
  const [project] = useState(projectData);
  const [issues, setIssues] = useState(projectData.project_issues);
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMembersModal, setviewMembersModal] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleSubmit = async (data) => {
    setModalOpen(false);
    setIssues([...issues, data]);

    const reqHeaders = headers;
    reqHeaders.method = "PUT";
    reqHeaders.body = JSON.stringify({ ...data, projectId: project["id"] });
    const req = await fetch(
      process.env.BACKEND_URL + "/projects/issues/new",
      reqHeaders
    );
    if (req.status === 200) return console.log("added");
  };

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
        <Paper className={classes.root}>
          <Box
            display="flex"
            alignItems="center"
            className={classes.title}
            justifyContent="space-between"
          >
            <Typography variant="h3" color="secondary">
              {project.project_name}
            </Typography>
            <Box alignItems="center">
              <Typography variant="h4" className={classes.author}>
                <PersonIcon />
                {project.project_owner_name}
              </Typography>
              <Box display="grid" alignItems="center">
                <Button onClick={() => setviewMembersModal(true)}>
                  <KeyboardArrowDownIcon /> View members
                </Button>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="h6">Description: </Typography>
            <Typography variant="body1">
              {project.project_description}
            </Typography>
          </Box>
          <Box
            display="flex"
            className={classes.subtitle}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Issues:</Typography>
            <Button onClick={handleModalOpen}>
              <AddIcon color="secondary" />
              Add Issue
            </Button>
          </Box>
          <Divider className={classes.subtitle} />
          <NewIssueModal
            open={modalOpen}
            onClose={handleModalClose}
            onSubmit={handleSubmit}
          />
          <UpdateMembersModal
            modalOpen={viewMembersModal}
            onClose={() => setviewMembersModal(false)}
            members={project.project_members}
            projectOwner={project.project_owner}
          />
          <div className={classes.table}>
            {issues?.length <= 0 ? (
              <Typography style={{ textAlign: "center" }} variant="h6">
                There are no Issues!
              </Typography>
            ) : (
              issues?.map((issue) => <Issue issue={issue} key={issue.id} />)
            )}
          </div>
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
