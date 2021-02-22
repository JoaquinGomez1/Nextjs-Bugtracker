import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import { Typography, Chip, Box } from "@material-ui/core";

import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/orange";
import pink from "@material-ui/core/colors/pink";

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
    "& > svg": {
      margin: "0 8px",
    },
  },
  chip: {
    margin: `0 ${theme.spacing(2)}px`,
    textTransform: "capitalize",
  },
}));

const chipColor = {
  low: green[500],
  medium: orange[500],
  high: pink[500],
};

export default function Issue({ issue }) {
  const classes = useStyles();
  const { issue_severity } = issue;
  const bgColor = chipColor[issue_severity];

  return (
    <div className={classes.row}>
      <div>
        <Box display="flex" alignItems="center">
          <Typography variant="h6">{issue.issue_name}</Typography>
          <Chip
            className={classes.chip}
            size="small"
            label={issue_severity || ""}
            style={{ backgroundColor: bgColor }}
          />
        </Box>
        <Typography variant="subtitle2" className={classes.author}>
          <PersonIcon />
          {issue.issue_author}
        </Typography>
      </div>
      <p>{issue.issue_date || new Date().toISOString()}</p>
    </div>
  );
}
