import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import { Typography, Chip, Box } from "@material-ui/core";

import chipColor from "../libs/severityColors";
import { IIssue } from "../interfaces/issue";
import { ITheme } from "../theme";

interface Props {
  issue: IIssue;
}

export default function Issue({ issue }: Props) {
  const classes = useStyles();
  let { issue_severity } = issue;
  const bgColor = chipColor[issue_severity];

  return (
    <div className={classes.row}>
      <div>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" className={classes.issueTitle}>
            {issue.issue_name}
          </Typography>
          <Chip
            className={classes.chip}
            size="small"
            label={issue_severity}
            style={{ backgroundColor: bgColor, color: "white" }}
          />
        </Box>
        <Typography variant="subtitle2" className={classes.author}>
          <PersonIcon />
          {issue?.issue_author}
        </Typography>
      </div>
      <p className={classes.date}>
        {new Date(issue.issue_date).toDateString() || new Date().toDateString()}
      </p>
    </div>
  );
}

const useStyles = makeStyles((theme: ITheme) => ({
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
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "60vw",
  },
}));
