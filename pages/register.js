import { useState, useContext, useEffect } from "react";
import { Paper, Button, TextField, Typography, Box } from "@material-ui/core";
import styles from "../styles/Login.module.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "next/link";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import headers from "../headers";
import { useRouter } from "next/router";
import { UserContext } from "../context/user";
import Alert from "../components/Alert";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "2rem",
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0,.04)",
    margin: "0 auto",
    width: "50px",
    boxShadow: "3px 3px 4px rgba(0,0,0,.1)",
  },
  paper: {
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
  const { setCurrentUser } = useContext(UserContext);
  const [showMessage, setShowMessage] = useState(false);
  const [responseMessage, setResponseMessage] = useState();
  const [userdata, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    user_name: "",
  });
  const classes = useStyles();
  const theme = useTheme();
  const isLightMode = theme.palette.type === "light" ? true : false;
  const router = useRouter();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userdata, [name]: value });
  };

  const handleSubmit = async () => {
    const URL = process.env.BACKEND_URL + "/user/register";
    const reqHeaders = headers;
    reqHeaders.method = "POST";
    reqHeaders.body = JSON.stringify(userdata);

    const req = await fetch(URL, reqHeaders);
    const res = await req.json();

    if (req.status === 200) {
      setCurrentUser(userdata);
      setTimeout(() => router.push("/"), 3000);
    }
    setResponseMessage(res);
    setShowMessage(true);
  };

  useEffect(() => {
    if (showMessage)
      setTimeout(() => {
        setShowMessage(false);
      }, 1500);
  }, [showMessage]);

  return (
    <div className={styles.container}>
      <Paper className={classes.paper}>
        <Typography
          variant="h6"
          className={classes.headline}
          color={isLightMode ? "black" : "white"}
        >
          <div className={classes.icon}>
            <MeetingRoomIcon />
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
            required
          />
          <TextField
            fullWidth
            placeholder="Name"
            variant="outlined"
            type="text"
            name="user_name"
            value={userdata.name}
            required
          />
          <TextField
            fullWidth
            placeholder="Password"
            variant="outlined"
            type="password"
            name="password"
            value={userdata.password}
            required
          />
          <TextField
            fullWidth
            placeholder="Confirm Password"
            variant="outlined"
            type="password"
            name="confirmPassword"
            value={userdata.confirmPassword}
            required
          />
        </form>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
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
          // <Box style={{ position: "relative" }}>
          <Alert success={responseMessage?.status === "success"}>
            {responseMessage.message}
            <HighlightOffIcon
              style={{ cursor: "pointer" }}
              onClick={() => setShowMessage(false)}
            />
          </Alert>
          // </Box>
        )}
      </Paper>
    </div>
  );
}
