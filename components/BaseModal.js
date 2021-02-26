import { Container, Modal, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100%",
  },
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateY(-50%) translateX(-50%)",
    "&:focus": {
      outline: "none",
      border: "none",
    },
  },
  paper: {
    padding: theme.spacing(4),
    width: "100%",
  },
}));

// Custom modal styling for this app
export default function BaseModal({ children, open, onClose }) {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Modal open={open} onClose={onClose}>
        <Container maxWidth="md" className={classes.container}>
          <Paper className={classes.paper}>{children}</Paper>
        </Container>
      </Modal>
    </Container>
  );
}
