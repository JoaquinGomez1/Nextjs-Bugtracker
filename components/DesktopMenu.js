import { Box, List, ListItemText } from "@material-ui/core";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  desktopMenu: {
    display: "initial",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  liContainer: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "40%",
    listStyle: "none",
  },
  listItem: {
    padding: `0 ${theme.spacing(1)}px`,
    margin: `0 ${theme.spacing(1)}px`,
    border: "2px solid transparent",
  },
}));

const customBorder = {
  borderBottom: [`2px solid rgba(0,0,0,0)`, `2px solid rgba(0,0,0,.4)`],
  transition: { duration: 0.3 },
};

export default function DesktopMenu({ links, userLoggedIn, ...rest }) {
  const classes = useStyles();
  return (
    <Box className={classes.desktopMenu} {...rest}>
      <List className={classes.liContainer}>
        {links.map(({ text, url, auth }) =>
          userLoggedIn
            ? auth !== false && (
                <motion.li
                  key={url}
                  whileHover={customBorder}
                  className={classes.listItem}
                >
                  <Link href={url}>
                    <a>{text}</a>
                  </Link>
                </motion.li>
              )
            : auth !== true && (
                <motion.li
                  key={url}
                  whileHover={customBorder}
                  className={classes.listItem}
                >
                  <Link href={url}>
                    <a className={classes.link}>
                      <ListItemText>{text}</ListItemText>
                    </a>
                  </Link>
                </motion.li>
              )
        )}
      </List>
    </Box>
  );
}
