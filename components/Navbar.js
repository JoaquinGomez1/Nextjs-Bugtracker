import { useContext, useEffect, useState } from "react";
import { AppBar, Toolbar, Container, IconButton } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import BugReportIcon from "@material-ui/icons/BugReport";
import Link from "next/link";
import { UserContext } from "../context/user";
import MobileMenu from "./MobileMenu";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  liContainer: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "40%",
    listStyle: "none",
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
  menuIcon: {
    color: "black",
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
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

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

          <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <MobileMenu
            links={linkList}
            left={drawerOpen}
            userLoggedIn={userLoggedIn}
            toggleDrawerHandler={() => setDrawerOpen(!drawerOpen)}
            currentUser={currentUser}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
