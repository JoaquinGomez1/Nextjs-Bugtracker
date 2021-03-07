import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { growY, growFromLeft } from "../libs/animations";
import { motion, AnimatePresence } from "framer-motion";
import headers from "../headers";
import Comment from "./Comment";

const MotionBox = motion(Box);

const useStyles = makeStyles((theme) => ({
  personIcon: {
    marginRight: theme.spacing(1),
  },
  divider: { margin: `${theme.spacing(3)}px 0` },
}));

export default function CommentSection({ comments: allComments, issueId }) {
  const classes = useStyles();
  const [comments, setComments] = useState(allComments || []);
  const [createComment, setCreateComment] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);

  const handleChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmit = async () => {
    if (!commentContent) return;
    const URL = process.env.BACKEND_URL + "/comments/new";

    const reqHeaders = headers;
    reqHeaders.method = "POST";
    reqHeaders.body = JSON.stringify({
      issue: issueId,
      content: commentContent,
    });
    const req = await fetch(URL, reqHeaders);
    const res = await req.json();

    if (req.status === 200) {
      setComments([{ ...res }, ...comments]);
      setCommentContent("");
    }
  };

  const handleDelete = async (id) => {
    const URL = process.env.BACKEND_URL + "/comments/delete";

    const reqHeaders = headers;
    reqHeaders.method = "DELETE";
    reqHeaders.body = JSON.stringify({ id: id });
    setDeleteButtonDisabled(true);
    const req = await fetch(URL, reqHeaders);

    if (req.status === 200) {
      // Remove comment from comments array.
      setComments([...comments].filter((comment) => comment.id !== id));
    }
    setDeleteButtonDisabled(false);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1">Comment Section</Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setCreateComment(!createComment)}
        >
          Add comment
        </Button>
      </Box>
      <Divider className={classes.divider} />

      <CreateComment
        handleChange={handleChange}
        createComment={createComment}
        commentContent={commentContent}
        handleSubmit={handleSubmit}
      />

      {comments.length >= 1 ? (
        <Box style={{ padding: "16px" }}>
          <AnimatePresence>
            {comments.map((comment, index) => (
              <Comment
                variants={growFromLeft}
                animate="show"
                initial="hidden"
                exit="exit"
                custom={index}
                key={comment.id}
                content={comment}
                onDelete={handleDelete}
                buttonDisabled={deleteButtonDisabled}
              />
            ))}
          </AnimatePresence>
        </Box>
      ) : (
        <Grid container justify="center">
          <Grid item style={{ textAlign: "center" }}>
            <Typography>There are no comments yet</Typography>
            <Button
              color="primary"
              onClick={() => setCreateComment(!createComment)}
            >
              Be the first!
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

function CreateComment({
  handleChange,
  commentContent,
  createComment,
  handleSubmit,
}) {
  return (
    <MotionBox
      variants={growY}
      animate={createComment ? "show" : "hidden"}
      style={{ padding: "16px", overflow: "hidden" }}
      display="flex"
    >
      <TextField
        variant="outlined"
        multiline
        rows={4}
        placeholder="Escribe tu comentario"
        onChange={handleChange}
        value={commentContent}
        style={{ width: "100%" }}
      />
      <Button
        onClick={handleSubmit}
        color="primary"
        style={{ padding: "16px", marginLeft: "24px" }}
        disabled={!commentContent}
      >
        Add comment
      </Button>
    </MotionBox>
  );
}
