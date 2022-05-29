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
import { ILink } from "../interfaces/link";

interface Props {
  links: ILink[];
  userLoggedIn: boolean;
}

export default function MobileMenu({ links, userLoggedIn, ...rest }: Props) {
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
                        <a>
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
