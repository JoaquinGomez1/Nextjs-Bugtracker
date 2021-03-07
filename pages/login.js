import { useContext } from "react";
import {
  Paper,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import styles from "../styles/Login.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Link from "next/link";
import headers from "../headers";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import { UserContext } from "../context/user";
import { AnimatePresence, motion } from "framer-motion";
import { growY } from "../libs/animations";

import BugReportIcon from "@material-ui/icons/BugReport";

const FramerPaper = motion(Paper);

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "2rem",
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0,.4)",
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

export default function Login() {
  const [userdata, setUserData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const { setCurrentUser } = useContext(UserContext);
  const classes = useStyles();
  const router = useRouter();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userdata, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const reqHeaders = headers;
    reqHeaders.method = "POST";
    reqHeaders.body = JSON.stringify(userdata);
    const URL = process.env.BACKEND_URL + "/user/login";
    const req = await fetch(URL, reqHeaders);
    const res = await req.json();
    setIsLoading(false);

    if (req.status === 200) {
      setCurrentUser(res?.data);
      router.push("/");
    } else {
      setShowMessage(res?.message);
    }
  };

  const handleKeyPress = ({ key }) => {
    if (key === "Enter") handleSubmit();
  };

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
          {showMessage && (
            <Alert
              style={{ top: 180 }}
              success={responseMessage?.status === "success"}
            >
              {responseMessage.message}
              <HighlightOffIcon
                style={{ cursor: "pointer" }}
                onClick={() => setShowMessage(false)}
              />
            </Alert>
          )}
        </FramerPaper>
      </AnimatePresence>
    </div>
  );
}
