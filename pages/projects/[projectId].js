import {
  Container,
  Paper,
  Typography,
  Divider,
  Box,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const mockData = {
  title: "My Project",
  issues: [
    {
      id: Math.random(),
      title: "Issue #1",
      author: "Juancito",
      date: new Date(),
      comments: [],
      status: "pending",
    },
    {
      id: Math.random(),
      title: "Issue #2",
      author: "Pedrito",
      date: new Date(),
      comments: [],
      status: "pending",
    },
  ],
  author: "Joaquin",
  members: [{ id: Math.random(), name: "Juan" }],
};

const commentSchema = {
  author: "User",
  date: new Date(),
  role: "contributor / owner ",
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
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
  title: {
    padding: "10px",
    marginBottom: theme.spacing(4),
  },
  subtitle: {
    marginBottom: theme.spacing(2),
  },
  author: {
    display: "flex",
    alignItems: "center",
    "& > svg": {
      margin: "0 8px",
    },
  },
}));

export default function ProjectPage() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Paper className={classes.root}>
        <Box
          display="flex"
          alignItems="center"
          className={classes.title}
          justifyContent="space-between"
        >
          <Typography variant="h3" color="secondary">
            {mockData.title}
          </Typography>
          <Box alignItems="center">
            <Typography variant="h4" className={classes.author}>
              <PersonIcon />
              {mockData.author}
            </Typography>
            <Button>
              <KeyboardArrowDownIcon /> View members
            </Button>
          </Box>
        </Box>
        <Typography variant="h5" className={classes.subtitle}>
          Issues:{" "}
        </Typography>
        <Divider className={classes.subtitle} />

        <div className={classes.table}>
          {mockData.issues.map((issue) => (
            <div key={issue.id} className={classes.row}>
              <div>
                <Typography variant="h6">{issue.title}</Typography>
                <Typography variant="subtitle2" className={classes.author}>
                  <PersonIcon />
                  {issue.author}
                </Typography>
              </div>
              <p>{issue.date.toISOString()}</p>
            </div>
          ))}
        </div>
      </Paper>
    </Container>
  );
}
