import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import { Typography, Chip, Box } from "@material-ui/core";

import chipColor from "../libs/severityColors";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
    "&:nth-child(even)": {
      backgroundColor: "rgba(0,0,0,.1)",
    },
    "&:hover": {
      transition: ".3s all ease-in-out",
      backgroundColor: "rgba(0,0,0,.2)",
      cursor: "pointer",
    },
  },
  author: {
    display: "flex",
    alignItems: "center",
    color: theme.palette?.subtitles?.main,
    "& > svg": {
      margin: "0 8px",
    },
  },
  chip: {
    margin: `0 ${theme.spacing(2)}px`,
    textTransform: "capitalize",
  },
  date: { color: theme.palette?.subtitles?.high },
  issueTitle: {
    whiteSpace: "wrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "60vw",
  },
}));

export default function Issue({ issue }) {
  const classes = useStyles();
  let { issue_severity } = issue;
  if (issue.severity) issue_severity = issue.severity;
  const bgColor = chipColor[issue_severity];

  return (
    <div className={classes.row}>
      <div>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" className={classes.issueTitle}>
            {issue.issue_name || issue.title}
          </Typography>
          <Chip
            className={classes.chip}
            size="small"
            label={issue_severity || issue?.severity}
            style={{ backgroundColor: bgColor, color: "white" }}
          />
        </Box>
        <Typography variant="subtitle2" className={classes.author}>
          <PersonIcon />
          {issue?.issue_author || issue?.author}
        </Typography>
      </div>
      <p className={classes.date}>
        {new Date(issue.issue_date).toDateString() || new Date().toDateString()}
      </p>
    </div>
  );
}
