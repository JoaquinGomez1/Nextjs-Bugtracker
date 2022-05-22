import { Box, Typography, Button, BoxProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import { useUserProvider } from "../context/user";
import { CustomDomComponent, motion, MotionProps } from "framer-motion";
import { pink } from "@material-ui/core/colors";
import { IComment } from "../interfaces/comment";

const MotionBox = motion(Box);

interface Props extends MotionProps {
  content: IComment;
  onDelete: (_: number) => void;
  buttonDisabled?: boolean;
}

export default function Comment({
  content,
  onDelete,
  buttonDisabled,
  ...rest
}: Props) {
  const classes = useStyles();
  const { currentUser } = useUserProvider();
  const deleteIsAllowed =
    currentUser?.id === content.comment_author_id ||
    currentUser?.user_role === "admin";

  return (
    <MotionBox
      {...(rest as CustomDomComponent<BoxProps>)}
      className={classes.commentRoot}
    >
      <Box display="flex" alignItems="center" className={classes.commentAuthor}>
        <PersonIcon />
        <Typography variant="body1" className={classes.commentTitle}>
          {content.comment_author || "Author"}
        </Typography>
        <Typography variant="subtitle2" className={classes.commentDate}>
          {new Date(content.comment_date).toDateString() || "20/02/21"}
        </Typography>
      </Box>

      <Box className={classes.commentBox}>
        <Box display="flex">
          <Typography style={{ width: "100%" }} className={classes.commentText}>
            {content.comment_content || "Comment..."}
          </Typography>
          {deleteIsAllowed && (
            <Button
              disabled={buttonDisabled}
              onClick={() => onDelete(content.id)}
            >
              <DeleteIcon className={classes.deleteIcon} />
            </Button>
          )}
        </Box>
      </Box>
    </MotionBox>
  );
}

const useStyles = makeStyles((theme) => ({
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
  commentText: {
    color: theme.palette.grey[400],
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
  deleteIcon: { color: pink[600] },
}));
