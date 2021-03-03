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

import { growY } from "../libs/animations";
import { motion } from "framer-motion";
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

export default function CommentSection() {
  const classes = useStyles();
  const [comments, setComments] = useState([{}, {}, {}, {}, {}]);
  const [createComment, setCreateComment] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const handleChange = (evento) => {
    setCommentContent(evento.target.value);
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
      />

      {comments.length >= 1 ? (
        <Box style={{ padding: "16px" }} className={classes.commentSectionRoot}>
          {comments.map((comment, index) => (
            <Comment key={index} content={comment} />
          ))}
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

function Comment({ content }) {
  const classes = useStyles();
  return (
    <Box className={classes.commentRoot}>
      <Box display="flex" alignItems="center" className={classes.commentAuthor}>
        <PersonIcon className={classes.personIcon} />
        <Typography variant="body1" className={classes.commentTitle}>
          {content.author || "Author"}
        </Typography>
        <Typography variants="subtitle2" className={classes.commentDate}>
          {"20/02/21"}
        </Typography>
      </Box>
      <Box className={classes.commentBox}>Comment....</Box>
    </Box>
  );
}

function CreateComment({ handleChange, commentContent, createComment }) {
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
      <Button color="primary" style={{ padding: "16px", marginLeft: "24px" }}>
        Agregar
      </Button>
    </MotionBox>
  );
}
