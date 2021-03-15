import { useContext } from "react";
import { AppBar, Toolbar, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BugReportIcon from "@material-ui/icons/BugReport";
import Link from "next/link";
import { UserContext } from "../context/user";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },

  title: {
    color: theme.palette.grey[800],
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  link: {
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.08)",
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

const linkList = [
  { text: "About", url: "/about" },
  { text: "Login", url: "/login", auth: false },
  { text: "Register", url: "/register", auth: false },
  { text: "Account", url: "/user", auth: true },
];

export default function Navbar() {
  const classes = useStyles();
  const { currentUser } = useContext(UserContext);
  const userLoggedIn = currentUser && Object.keys(currentUser).length >= 1;

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar className={classes.container}>
          <Link href="/">
            <h2>
              <a className={classes.title}>
                <BugReportIcon className={classes.icon} />
                Bug Tracker
              </a>
            </h2>
          </Link>

          <DesktopMenu userLoggedIn={userLoggedIn} links={linkList} />

          <MobileMenu userLoggedIn={userLoggedIn} links={linkList} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
