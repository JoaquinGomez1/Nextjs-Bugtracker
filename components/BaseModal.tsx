import { Container, Modal, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../libs/animations";

const MotionContainer = motion(Container);

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

// Custom modal styling for this app
export default function BaseModal({ children, open, onClose }: Props) {
  const classes = useStyles();
  return (
    <AnimatePresence>
      <Container className={classes.root}>
        <Modal open={open} onClose={onClose}>
          <MotionContainer
            variants={fadeIn}
            initial="hidden"
            animate="show"
            exit="exit"
            maxWidth="md"
            className={classes.container}
          >
            <Paper className={classes.paper}>{children}</Paper>
          </MotionContainer>
        </Modal>
      </Container>
    </AnimatePresence>
  );
}

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
