import { useReducer, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Chip,
  Box,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import authenticatedRequest from "../../libs/authRequest";
import { makeStyles } from "@material-ui/core";
import CommentSection from "../../components/ComentSection";
import chipColor from "../../libs/severityColors";
import pink from "@material-ui/core/colors/pink";
import ConfirmModal from "../../components/ConfirmModal";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import headers from "../../headers";
import { useRouter } from "next/router";

import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, growY } from "../../libs/animations";

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(3), margin: `${theme.spacing(4)}px 0` },
  title: {
    marginRight: theme.spacing(2),
    maxWidth: "650px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.2rem",
    },
  },
  descriptionSection: { margin: `${theme.spacing(4)}px 0` },
  descriptionText: { color: theme?.palette?.subtitles?.main },
  issueInfo: {
    textAlign: "right",
  },
  date: { color: theme.palette.grey[500] },
  authorIcon: { marginRight: theme.spacing(2) },
  actionIcons: { marginLeft: theme.spacing(3) },
  deleteIssue: { color: pink[500] },
}));

const MotionBox = motion(Box);
const MotionContainer = motion(Container);
const MotionTypography = motion(Typography);

const initialState = {
  editDescription: false,
  descriptionContent: "",
  showConfirmModal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "EDIT": {
      return { ...state, editDescription: !state.editDescription };
    }
    case "VALUE_CHANGE": {
      return { ...state, descriptionContent: action.payload };
    }
    case "SUBMIT": {
      return { ...state, editDescription: false, descriptionContent: "" };
    }
    case "TOGGLE_CONFIRM_MODAL": {
      return { ...state, showConfirmModal: !state.showConfirmModal };
    }
    case "CLOSE_CONFIRM_MODAL": {
      return { ...state, showConfirmModal: false };
    }
    default: {
      return state;
    }
  }
}

export default function ViewIssue({ issueData, issueComments }) {
  const {
    id,
    issue_name,
    issue_description,
    issue_date,
    issue_author,
    issue_severity,
  } = issueData;
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [description, setDescription] = useState(issue_description);
  const router = useRouter();

  const handleSubmit = async () => {
    const URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/projects/issues/update";
    const reqHeaders = headers;
    reqHeaders.method = "POST";
    reqHeaders.body = JSON.stringify({
      fieldName: "issue_description",
      fieldValue: state.descriptionContent,
      issueId: id,
    });
    const req = await fetch(URL, reqHeaders);
    if (req.status === 200) {
      setDescription(state.descriptionContent);
      dispatch({ type: "SUBMIT" });
    }
  };

  const handleDeleteIssue = async () => {
    const URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/projects/issues/delete";
    const reqHeaders = headers;
    reqHeaders.method = "DELETE";
    reqHeaders.body = JSON.stringify({
      id,
    });
    const req = await fetch(URL, reqHeaders);
    if (req.status === 200) {
      dispatch({ type: "CLOSE_CONFIRM_MODAL" });
      router.back();
    }
  };

  return (
    <MotionContainer
      variants={fadeIn}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Paper className={classes.root}>
        <Grid container>
          <Grid container>
            <Grid item xs={12}>
              <Grid item xs={12} md={8} display="flex" alignItems="center">
                <Typography variant="h3" className={classes.title}>
                  {issue_name}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Chip
                  label={issue_severity}
                  style={{
                    backgroundColor: chipColor[issue_severity],
                    textTransform: "capitalize",
                  }}
                />
                <IconButton
                  className={classes.deleteIssue}
                  onClick={() => dispatch({ type: "TOGGLE_CONFIRM_MODAL" })}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={8}>
            <Box className={classes.descriptionSection}>
              <Typography variant="h4">
                Description:{" "}
                <IconButton
                  color="primary"
                  className={classes.actionIcons}
                  onClick={() => dispatch({ type: "EDIT" })}
                >
                  <EditIcon />
                </IconButton>
              </Typography>
              <AnimatePresence>
                {state.editDescription ? (
                  <MotionBox
                    variants={growY}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    display="flex"
                    alignItems="center"
                    style={{ overflowY: "hidden" }}
                  >
                    <TextField
                      style={{
                        margin: "16px 0",
                        width: "280px",
                      }}
                      variant="outlined"
                      placeholder="New issue description..."
                      value={state.descriptionContent}
                      onChange={(e) =>
                        dispatch({
                          type: "VALUE_CHANGE",
                          payload: e.target.value,
                        })
                      }
                    />
                    <IconButton
                      disabled={!state.descriptionContent}
                      className={classes.actionIcons}
                      color="primary"
                      onClick={handleSubmit}
                    >
                      <DoneIcon />
                    </IconButton>
                  </MotionBox>
                ) : (
                  <MotionTypography
                    variants={fadeIn}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    variant="body1"
                    className={classes.descriptionText}
                  >
                    {description}
                  </MotionTypography>
                )}
              </AnimatePresence>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box className={classes.issueInfo}>
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <PersonIcon color="primary" className={classes.authorIcon} />
                <Typography variant="h5">{issue_author}</Typography>
              </Box>
              <Typography className={classes.date}>
                {new Date(issue_date).toDateString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <CommentSection comments={issueComments} issueId={id} />
        <ConfirmModal
          open={state.showConfirmModal}
          onClose={() => dispatch({ type: "CLOSE_CONFIRM_MODAL" })}
          onConfirm={handleDeleteIssue}
          onCancel={() => dispatch({ type: "CLOSE_CONFIRM_MODAL" })}
          prompt="Are you sure you want to delete this issue ?"
        />
      </Paper>
    </MotionContainer>
  );
}

export async function getServerSideProps(ctx) {
  const issueData = await authenticatedRequest(
    ctx,
    `/projects/issues/${ctx.query.id}`
  );

  const issueComments = await authenticatedRequest(
    ctx,
    `/comments?issue=${ctx.query.id}`
  );

  // if there is a message it means something went wrong
  if (issueData.message)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return { props: { issueData, issueComments } };
}
