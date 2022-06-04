import { KeyboardEvent, SyntheticEvent, useEffect } from "react";
import {
  Paper,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box,
} from "@material-ui/core";
import styles from "../styles/Login.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUserProvider } from "../context/user";
import { AnimatePresence, motion } from "framer-motion";
import { growY } from "../libs/animations";
import Alert from "../components/Alert";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import BugReportIcon from "@material-ui/icons/BugReport";
import AppResponse from "../interfaces/appResponse";
import IUser from "../interfaces/user";
import { logInUser } from "../services/userService";

const FramerPaper = motion(Paper);

type LoginResponse = AppResponse<IUser> | undefined;

export default function Login() {
  const [userdata, setUserData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState<LoginResponse>();
  const { setCurrentUser, logTestAccount, currentUser } = useUserProvider();
  const classes = useStyles();
  const router = useRouter();

  const handleFormChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setUserData({ ...userdata, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const { req, res } = await logInUser(userdata);

    if (req.status === 200) {
      setCurrentUser(res?.data);
    } else {
      setShowMessage(res);
    }
    setIsLoading(false);
  };

  const handleKeyPress = ({ key }: KeyboardEvent) => {
    if (key === "Enter") handleSubmit();
  };

  useEffect(() => {
    if (!!currentUser?.id) {
      router.push("/");
    }
  }, [currentUser]);

  return (
    <div className={styles.container}>
      <AnimatePresence>
        <FramerPaper
          variants={growY}
          animate="show"
          initial="hidden"
          exit="exit"
          className={classes.paper}
        >
          <Typography variant="h6" className={classes.headline}>
            <div className={classes.icon}>
              <BugReportIcon color="primary" />
            </div>
            <br />
            Log in and manage your projects
          </Typography>
          <form onChange={handleFormChange} className={classes.form}>
            <TextField
              fullWidth
              placeholder="Username"
              variant="outlined"
              type="text"
              name="username"
              value={userdata.username}
              onKeyPress={handleKeyPress}
              required
            />
            <TextField
              fullWidth
              placeholder="Password"
              variant="outlined"
              type="password"
              name="password"
              value={userdata.password}
              onKeyPress={handleKeyPress}
              required
            />
          </form>
          <Button
            variant="contained"
            disabled={isLoading}
            color="primary"
            onClick={handleSubmit}
            onKeyPress={handleKeyPress}
          >
            {!isLoading ? "Log in" : <CircularProgress />}
          </Button>
          <Typography variant="subtitle2" className={classes.bottomText}>
            You don't have an account yet?
            <br />
            <Link href="/register">
              <Typography
                variant="inherit"
                color="primary"
                className={classes.link}
              >
                Sign up
              </Typography>
            </Link>
          </Typography>
          {showMessage?.message && (
            <Alert success={showMessage?.status === "success"}>
              <Typography variant="h5">{showMessage?.message}</Typography>
              <HighlightOffIcon
                style={{ cursor: "pointer" }}
                onClick={() => setShowMessage(undefined)}
              />
            </Alert>
          )}
          <Typography variant="subtitle2" className={classes.bottomText}>
            Or
          </Typography>
          <Button onClick={() => logTestAccount()}>
            Login With Test Account
          </Button>
        </FramerPaper>
      </AnimatePresence>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "2rem",
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0,.2)",
    margin: "0 auto",
    width: "50px",
    height: "50px",
    boxShadow: "3px 3px 4px rgba(0,0,0,.1)",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    overflow: "hidden",
    maxWidth: "400px",
    display: "grid",
    boxShadow: "3px 3px 5px rgba(0,0,0,.2)",
    padding: theme.spacing(4),
    "& > *": {
      marginTop: theme.spacing(4),
    },
  },
  headline: {
    textAlign: "center",
    fontWeight: "bold",
  },
  form: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  link: {
    cursor: "pointer",
  },
  bottomText: {
    textAlign: "center",
  },
}));
