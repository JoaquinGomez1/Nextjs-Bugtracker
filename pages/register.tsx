import { useState, useEffect, KeyboardEvent, SyntheticEvent } from "react";
import { Paper, Button, TextField, Typography } from "@material-ui/core";
import styles from "../styles/Login.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import BugReportIcon from "@material-ui/icons/BugReport";
import headers from "../headers";
import { useRouter } from "next/router";
import { UserContext, useUserProvider } from "../context/user";
import Alert from "../components/Alert";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { AnimatePresence, motion } from "framer-motion";
import { growY } from "../libs/animations";
import AppResponse from "../interfaces/appResponse";

const FramerPaper = motion(Paper);

export default function Login() {
  const { setCurrentUser } = useUserProvider();
  const [showMessage, setShowMessage] = useState(false);
  const [responseMessage, setResponseMessage] = useState<AppResponse>();
  const [userdata, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    user_name: "",
  });
  const classes = useStyles();
  const router = useRouter();

  const handleFormChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setUserData({ ...userdata, [name]: value });
  };

  const handleSubmit = async () => {
    const URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/user/register";
    const reqHeaders = headers;
    reqHeaders.method = "POST";
    reqHeaders.body = JSON.stringify(userdata);

    const req = await fetch(URL, reqHeaders as RequestInit);
    const res = await req.json();

    if (req.status === 200) {
      setCurrentUser(res);
      setTimeout(() => router.push("/"), 1500);
    }
    setResponseMessage(res);
    setShowMessage(true);
  };

  const handleKeyPress = ({ key }: KeyboardEvent) => {
    if (key === "Enter") handleSubmit();
  };

  useEffect(() => {
    if (showMessage)
      setTimeout(() => {
        setShowMessage(false);
      }, 1500);
  }, [showMessage]);

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
            Sign up and start organizing your projects
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
              placeholder="Name"
              variant="outlined"
              type="text"
              name="user_name"
              value={userdata.user_name}
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
            <TextField
              fullWidth
              placeholder="Confirm Password"
              variant="outlined"
              type="password"
              name="confirmPassword"
              value={userdata.confirmPassword}
              onKeyPress={handleKeyPress}
              required
            />
          </form>
          <Button
            variant="contained"
            color="primary"
            onKeyPress={handleKeyPress}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Typography variant="subtitle2" className={classes.bottomText}>
            Already have an account?
            <br />
            <Link href="/login">
              <Typography
                variant="inherit"
                color="primary"
                className={classes.link}
              >
                Sign in
              </Typography>
            </Link>
          </Typography>

          {showMessage && (
            <Alert success={responseMessage?.status === "success"}>
              {responseMessage?.message}
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

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
  },
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
    overflowY: "hidden",
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
  alert: {
    top: 280,
  },
}));
