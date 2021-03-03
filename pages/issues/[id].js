import {
  Container,
  Paper,
  Typography,
  Chip,
  Box,
  Grid,
} from "@material-ui/core";
import authenticatedRequest from "../../libs/authRequest";
import { makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import { fadeIn } from "../../libs/animations";
import CommentSection from "../../components/ComentSection";
import chipColor from "../../libs/severityColors";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(3), margin: `${theme.spacing(4)}px 0` },
  title: { marginRight: theme.spacing(2) },
  descriptionSection: { margin: `${theme.spacing(4)}px 0` },
  descriptionText: { color: theme?.palette?.subtitles?.main },
  issueInfo: {
    textAlign: "right",
  },
  date: { color: theme.palette.grey[500] },
  authorIcon: { marginRight: theme.spacing(2) },
}));

const MotionContainer = motion(Container);

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

  return (
    <MotionContainer
      variants={fadeIn}
      initial="hidden"
      animate="show"
      exit="exit"
      maxWidth="lg"
    >
      <Paper className={classes.root}>
        <Grid container>
          <Grid item xs={8}>
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
          </Grid>

          <Grid item xs={8}>
            <Box className={classes.descriptionSection}>
              <Typography variant="h4">Description:</Typography>
              <Typography variant="body1" className={classes.descriptionText}>
                {issue_description}
              </Typography>
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

  console.log(issueComments);

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
