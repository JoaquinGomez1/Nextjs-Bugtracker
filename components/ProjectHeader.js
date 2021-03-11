import { useState } from "react";
import { Box, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UpdateMembersModal from "./UpdateMembersModal";
import PersonIcon from "@material-ui/icons/Person";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

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
    color: theme.palette?.subtitles?.high,
  },
  projectTitle: {
    marginBottom: theme.spacing(2),
  },
}));

export default function ProjectHeader({ project }) {
  const [viewMembersModal, setviewMembersModal] = useState(false);
  const classes = useStyles();

  return (
    <Box>
      <Grid
        container
        display="flex"
        alignItems="center"
        className={classes.title}
        justify="space-between"
      >
        <Typography
          variant="h3"
          color="secondary"
          className={classes.projectTitle}
        >
          {project.project_name}
        </Typography>

        <Box alignItems="center">
          <Typography variant="h4" className={classes.author}>
            <PersonIcon color="secondary" style={{ marginRight: "24px" }} />
            {project.project_owner_name}
          </Typography>

          <Box display="grid" alignItems="center">
            <Button onClick={() => setviewMembersModal(true)}>
              <KeyboardArrowDownIcon /> View members
            </Button>
            <UpdateMembersModal
              projectId={project.id}
              modalOpen={viewMembersModal}
              onClose={() => setviewMembersModal(false)}
              members={project.project_members}
              projectOwner={project.project_owner}
            />
          </Box>
        </Box>
      </Grid>

      <Box>
        <Typography variant="h6">Description: </Typography>
        <Typography variant="body1" className={classes.subtitle}>
          {project.project_description}
        </Typography>
      </Box>
    </Box>
  );
}
