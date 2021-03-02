import { useState } from "react";
import { Box, Typography, Button } from "@material-ui/core";
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
    color: theme.palette?.subtitles?.main,
  },
}));

export default function ProjectHeader({ project }) {
  const [viewMembersModal, setviewMembersModal] = useState(false);
  const classes = useStyles();

  return (
    <Box>
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
            <UpdateMembersModal
              modalOpen={viewMembersModal}
              onClose={() => setviewMembersModal(false)}
              members={project.project_members}
              projectOwner={project.project_owner}
            />
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6">Description: </Typography>
        <Typography variant="body1" className={classes.subtitle}>
          {project.project_description}
        </Typography>
      </Box>
    </Box>
  );
}
