import { Container, Paper, Typography, Chip, Box } from "@material-ui/core";
import authenticatedRequest from "../../libs/authRequest";
import { makeStyles } from "@material-ui/core";

import { motion } from "framer-motion";
import { fadeIn } from "../../libs/animations";

import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/orange";
import pink from "@material-ui/core/colors/pink";

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(3), margin: `${theme.spacing(4)}px 0` },
  title: { marginRight: theme.spacing(2) },
  descriptionSection: { margin: `${theme.spacing(4)}px 0` },
  descriptionText: { color: theme?.palette?.subtitles?.main },
}));

const chipColor = {
  low: green[500],
  medium: orange[500],
  high: pink[500],
};

const MotionContainer = motion(Container);

export default function ViewIssue({ issueData }) {
  const {
    id,
    issue_name,
    issue_description,
    issue_date,
    issue_project,
    issue_author,
    issue_severity,
  } = issueData;
  const classes = useStyles();

  return (
    <MotionContainer
      variants={fadeIn}
      initial="hidden"
      animate="show"
      exit="exit"
      maxWidth="lg"
    >
      <Paper className={classes.root}>
        <Box display="flex" alignItems="center">
          <Typography variant="h2" className={classes.title}>
            {issue_name}{" "}
          </Typography>
          <Chip
            label={issue_severity}
            style={{
              backgroundColor: chipColor[issue_severity],
              textTransform: "capitalize",
            }}
          />
        </Box>

        <Box className={classes.descriptionSection}>
          <Typography variant="h4">Description:</Typography>
          <Typography variant="body1" className={classes.descriptionText}>
            {issue_description}
          </Typography>
        </Box>
      </Paper>
    </MotionContainer>
  );
}

export async function getServerSideProps(ctx) {
  const issueData = await authenticatedRequest(
    ctx,
    `/projects/issues/${ctx.query.id}`
  );
  // if there is a message it means something went wrong
  if (issueData.message)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return { props: { issueData } };
}
