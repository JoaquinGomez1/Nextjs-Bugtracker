import { ChangeEvent, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";

import { growFromLeft } from "../libs/animations";
import { AnimatePresence } from "framer-motion";
import Comment from "./Comment";
import { IComment } from "../interfaces/comment";
import useFetch from "../hooks/useFetch";
import { CreateComment } from "./CreateComment";

interface Props {
  comments: IComment[];
  issueId: number;
}

export default function CommentSection({
  comments: allComments,
  issueId,
}: Props) {
  const classes = useStyles();
  const [comments, setComments] = useState(allComments || []);
  const [allowCreateComment, setAllowCreateComment] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  const { fetchData } = useFetch<IComment>("/comments/new", {
    useInitialFetch: false,
  });
  const { fetchData: requestDelete } = useFetch("/comments/delete", {
    useInitialFetch: false,
  });

  const toggleAllowCreateComment = () =>
    setAllowCreateComment(!allowCreateComment);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentContent(event.target.value);
  };

  const handleSubmit = async () => {
    if (!commentContent) return;
    const { req, res } = await fetchData({
      method: "post",
      body: JSON.stringify({
        issue: issueId,
        content: commentContent,
      }),
    });

    if (req.status === 200) {
      setComments([{ ...res }, ...comments]);
      setCommentContent("");
    }
  };

  const handleDelete = async (id: number) => {
    setDeleteButtonDisabled(true);
    const { req } = await requestDelete({
      method: "delete",
      body: JSON.stringify({ id }),
    });

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
          onClick={toggleAllowCreateComment}
        >
          Add comment
        </Button>
      </Box>
      <Divider className={classes.divider} />

      <CreateComment
        handleChange={handleChange}
        allowCreateComment={allowCreateComment}
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
            <Button color="primary" onClick={toggleAllowCreateComment}>
              Be the first!
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  personIcon: {
    marginRight: theme.spacing(1),
  },
  divider: { margin: `${theme.spacing(3)}px 0` },
}));
