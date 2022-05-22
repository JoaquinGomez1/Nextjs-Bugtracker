import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import { motion } from "framer-motion";
import { ChangeEvent } from "react";
import { growY } from "../libs/animations";

const MotionBox = motion(Box);

interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  allowCreateComment: boolean;
  commentContent: string;
}

export function CreateComment({
  handleChange,
  commentContent,
  allowCreateComment,
  handleSubmit,
}: Props) {
  const classes = useStyles();
  return (
    <MotionBox
      variants={growY}
      animate={allowCreateComment ? "show" : "hidden"}
      className={classes.commentBox}
      display="flex"
    >
      <TextField
        variant="outlined"
        multiline
        rows={4}
        placeholder="Write down your comment here"
        onChange={handleChange}
        value={commentContent}
        style={{ width: "100%" }}
      />
      <Button
        onClick={handleSubmit}
        color="primary"
        className={classes.createCommentButton}
        disabled={!commentContent}
      >
        Add comment
      </Button>
    </MotionBox>
  );
}

const useStyles = makeStyles((theme) => ({
  createCommentButton: {
    marginLeft: "24px",
    padding: "16px",
    [theme.breakpoints.down("sm")]: {
      margin: "10px 0",
    },
  },
  commentBox: {
    overflow: "hidden",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));
