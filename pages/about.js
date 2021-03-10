import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Button,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../context/user";

const useStyles = makeStyles((theme) => ({
  paper: { margin: "24px 0" },
  root: { padding: theme.spacing(2) },
  highlight: {
    color: theme.palette.primary.main,
  },
  header: { margin: `${theme.spacing(2)}px 0` },
  subheader: {
    color: theme.palette.grey[500],
    maxWidth: "60%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  mainText: {
    [theme.breakpoints.down("sm")]: {
      order: 2,
    },
  },
}));

export default function About() {
  const classes = useStyles();
  const { currentUser } = useContext(UserContext);

  return (
    <Container maxWidth="lg">
      <Paper className={classes.paper}>
        <Grid className={classes.root}>
          <Typography variant="h3">About Bug Tracker</Typography>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item md={6} sm={12} className={classes.mainText}>
              <Typography variant="h4" className={classes.header}>
                Keep track of <span className={classes.highlight}>every</span>{" "}
                problem
              </Typography>
              <Typography variant="h6" className={classes.subheader}>
                Whether we want to admit it or not, the truth is that more often
                than not, we need to keep track of our mistakes
              </Typography>
              <Button color="primary">
                <Link href={currentUser.id ? "/" : "/register"}>
                  <a>Get's Started</a>
                </Link>
              </Button>
            </Grid>
            <Grid item md={6} sm={12} className={classes.image}>
              <Image
                fixed
                src={`/illustrations/about.svg`}
                width="800"
                height="800"
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
