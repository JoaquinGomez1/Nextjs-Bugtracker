import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles/";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Link from "next/link";

const styles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  liContainer: {
    padding: `0 ${theme.spacing(2)}px`,
    fontSize: "2rem",
  },
}));

export default function MobileMenu({
  toggleDrawerHandler,
  left,
  links,
  userLoggedIn,
}) {
  const classes = styles();

  return (
    <Drawer anchor="right" open={left} onClose={toggleDrawerHandler}>
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawerHandler}
        onKeyDown={toggleDrawerHandler}
      >
        <List>
          {links.map(({ text, url, auth }) =>
            userLoggedIn
              ? auth !== false && (
                  <ListItem key={url} className={classes.liContainer}>
                    <Link href={url}>
                      <a>{text}</a>
                    </Link>
                  </ListItem>
                )
              : auth !== true && (
                  <li key={url} className={classes.liContainer}>
                    <Link href={url}>
                      <a className={classes.link}>
                        <ListItemText>{text}</ListItemText>
                      </a>
                    </Link>
                  </li>
                )
          )}
        </List>
      </div>
    </Drawer>
  );
}
