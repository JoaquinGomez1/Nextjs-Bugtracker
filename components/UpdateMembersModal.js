import { useContext } from "react";
import {
  Modal,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import { UserContext } from "../context/user";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "grid",
  },
  paper: {
    padding: theme.spacing(4),
    position: "absolute",
    transform: "translateY(50%)",
    width: "100%",
    top: "50%",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
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
  author: {
    display: "flex",
    alignItems: "center",
    "& > svg": {
      margin: "0 8px",
    },
  },
  header: {
    padding: theme.spacing(2),
  },
}));

export default function UpdateMembersModal({
  modalOpen,
  members,
  onClose,
  projectOwner,
}) {
  const { currentUser } = useContext(UserContext);
  const classes = useStyles();
  return (
    <Modal open={modalOpen} onClose={onClose}>
      <Container maxWidth="md" className={classes.root}>
        <Paper className={classes.paper}>
          <Typography className={classes.header} variant="h4">
            {" "}
            View members
          </Typography>
          <Box display="grid">
            {members.map((member) => (
              <div className={classes.row}>
                <div>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h6">{member.username}</Typography>
                  </Box>
                  <Typography variant="subtitle2" className={classes.author}>
                    <PersonIcon color="primary" />
                    {member.user_id}
                  </Typography>
                </div>
                {currentUser.id === projectOwner && (
                  <Box display="flex">
                    <Button>
                      <CreateIcon />
                    </Button>
                    <Button>
                      <DeleteIcon />
                    </Button>
                  </Box>
                )}
              </div>
            ))}
          </Box>
        </Paper>
      </Container>
    </Modal>
  );
}
