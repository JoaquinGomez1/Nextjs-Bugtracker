import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles/";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import Link from "next/link";
import MenuIcon from "@material-ui/icons/Menu";

const styles = makeStyles((theme) => ({
  mobileMenu: {
    display: "initial",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
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
  menuIcon: {
    color: theme.palette.grey[800],
  },
}));

export default function MobileMenu({ links, userLoggedIn, ...rest }) {
  const classes = styles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box className={classes.mobileMenu}>
      <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
        <MenuIcon className={classes.menuIcon} />
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(!drawerOpen)}
        {...rest}
      >
        <div
          className={classes.list}
          role="presentation"
          onClick={() => setDrawerOpen(!drawerOpen)}
          onKeyDown={() => setDrawerOpen(!drawerOpen)}
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
    </Box>
  );
}
