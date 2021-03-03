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
import PersonIcon from "@material-ui/icons/Person";

import { growY, growFromLeft } from "../libs/animations";
import { motion, AnimatePresence } from "framer-motion";
import headers from "../headers";
const MotionBox = motion(Box);

const useStyles = makeStyles((theme) => ({
  commentSectionRoot: { maxHeight: "800px", overflowY: "scroll" },
  personIcon: {
    marginRight: theme.spacing(1),
  },
  commentTitle: {
    marginRight: theme.spacing(4),
    textAlign: "center",
  },
  commentBox: {
    minHeight: "90px",
    border: `2px solid ${theme.palette.grey[700]}`,
    padding: theme.spacing(1),
    color: theme.palette.grey[300],
    borderRadius: "8px",
    "&:hover": {
      borderColor: theme.palette.primary.dark,
    },
  },
  commentAuthor: {
    padding: theme.spacing(1),
  },
  commentRoot: {
    margin: `${theme.spacing(2)}px 0`,
  },
  commentDate: {
    color: theme.palette.grey[500],
  },
  divider: { margin: `${theme.spacing(3)}px 0` },
}));

const URL = process.env.BACKEND_URL + "/comments/new";

export default function CommentSection({ comments: allComments, issueId }) {
  const classes = useStyles();
  const [comments, setComments] = useState(allComments || []);
  const [createComment, setCreateComment] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const handleChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmit = async () => {
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

    console.log(res);
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
        <AnimatePresence>
          <Box
            style={{ padding: "16px" }}
            className={classes.commentSectionRoot}
          >
            {comments.map((comment, index) => (
              <Comment
                variants={growFromLeft}
                animate="show"
                initial="hidden"
                custom={index}
                key={comment.id}
                content={comment}
              />
            ))}
          </Box>
        </AnimatePresence>
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

function Comment({ content, ...rest }) {
  const classes = useStyles();
  return (
    <MotionBox {...rest} className={classes.commentRoot}>
      <Box display="flex" alignItems="center" className={classes.commentAuthor}>
        <PersonIcon className={classes.personIcon} />
        <Typography variant="body1" className={classes.commentTitle}>
          {content.comment_author || "Author"}
        </Typography>
        <Typography variants="subtitle2" className={classes.commentDate}>
          {new Date(content.comment_date).toDateString() || "20/02/21"}
        </Typography>
      </Box>
      <Box className={classes.commentBox}>
        {content.comment_content || "Comment..."}
      </Box>
    </MotionBox>
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
        maxWidth
        style={{ width: "100%" }}
      />
      <Button
        onClick={handleSubmit}
        color="primary"
        style={{ padding: "16px", marginLeft: "24px" }}
      >
        Add comment
      </Button>
    </MotionBox>
  );
}
