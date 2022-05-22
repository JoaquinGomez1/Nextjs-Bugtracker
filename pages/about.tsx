import { Container, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";

import { useUserProvider } from "../context/user";
import { motion } from "framer-motion";
import { fadeIn, growY } from "../libs/animations";
import Link from "next/link";

const MotionButton = motion(Button);

const customGrowY = {
  hidden: { height: 0, opacity: 0 },
  show: (custom: number) => ({
    height: "auto",
    opacity: 1,
    transition: { duration: 1.2, delay: 0.02 * custom },
  }),
  exit: { height: 0, opacity: 0 },
};

const customFadeIn = {
  hidden: { opacity: 0 },
  show: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: 0.13 * i + 0.6 },
  }),
  exit: { opacity: 0, x: 100 },
};

const customGrow = {
  scale: [1, 1.08, 1],
  transition: { duration: 1 },
};

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

const pageTitle = "Keep track of every problem";

export default function About() {
  const classes = useStyles();
  const { currentUser } = useUserProvider();

  return (
    <Container maxWidth="lg" style={{ overflow: "hidden" }}>
      <motion.div
        variants={customGrowY}
        animate="show"
        initial="hidden"
        exit="exit"
        className={classes.paper}
      >
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
                {pageTitle.split(" ").map((word, index) =>
                  word === "every" ? (
                    <motion.span
                      key={word + index}
                      variants={customFadeIn}
                      initial="hidden"
                      animate="show"
                      custom={index * 2}
                      className={classes.highlight}
                    >
                      {" " + word}
                    </motion.span>
                  ) : (
                    <motion.span
                      key={word + index}
                      variants={customFadeIn}
                      initial="hidden"
                      animate="show"
                      custom={index}
                    >
                      {" " + word}
                    </motion.span>
                  )
                )}
              </Typography>

              <Typography variant="h6" className={classes.subheader}>
                <motion.span variants={fadeIn} initial="hidden" animate="show">
                  Whether we want to admit it or not, the truth is that more
                  often than not, we need to keep track of our mistakes
                </motion.span>
              </Typography>

              <MotionButton
                variants={growY}
                initial="hidden"
                animate="show"
                variant="outlined"
                style={{ marginTop: 20 }}
                whileHover={customGrow}
                color="primary"
              >
                <Link href={currentUser?.id ? "/" : "/register"}>
                  <a>
                    <Typography variant="subtitle1"> Get's Started </Typography>
                  </a>
                </Link>
              </MotionButton>
            </Grid>
            <Grid item md={6} sm={12}>
              <Image
                src={`/illustrations/about.svg`}
                width="800"
                height="800"
              />
            </Grid>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
}
