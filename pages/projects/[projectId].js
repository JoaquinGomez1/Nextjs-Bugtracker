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

import headers from "../../headers";

import authenticatedRequest from "../../libs/authRequest";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
    "&:nth-child(even)": {
      backgroundColor: "rgba(0,0,0,.1)",
    },
    "&:hover": {
      transition: ".3s all ease-in-out",
      backgroundColor: "rgba(0,0,0,.2)",
      cursor: "pointer",
    },
  },
  title: {
    padding: "10px",
    marginBottom: theme.spacing(4),
  },
  subtitle: {
    marginBottom: theme.spacing(2),
  },
  author: {
    display: "flex",
    alignItems: "center",
    "& > svg": {
      margin: "0 8px",
    },
  },
}));

export default function ProjectPage({ projectData, projectIssues }) {
  const [project] = useState(projectData);
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [issues, setIssues] = useState([]);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleSubmit = async (data) => {
    setIssues([...issues, data]);
    setModalOpen(false);

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
            <Button>
              <KeyboardArrowDownIcon /> View members
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography variant="h6">Description: </Typography>
          <Typography variant="body1">{project.project_description}</Typography>
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
        <div className={classes.table}>
          {issues?.length <= 0 ? (
            <Typography style={{ textAlign: "center" }} variant="h6">
              There are no Issues!
            </Typography>
          ) : (
            issues.map((issue) => (
              <div key={issue.id} className={classes.row}>
                <div>
                  <Typography variant="h6">{issue.title}</Typography>
                  <Typography variant="subtitle2" className={classes.author}>
                    <PersonIcon />
                    {issue.author}
                  </Typography>
                </div>
                <p>{new Date().toISOString()}</p>
              </div>
            ))
          )}
        </div>
      </Paper>
    </Container>
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
