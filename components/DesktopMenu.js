import { Box, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "./CustomLink";

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
}));

export default function DesktopMenu({ links, userLoggedIn, ...rest }) {
  const classes = useStyles();
  return (
    <Box className={classes.desktopMenu} {...rest}>
      <List className={classes.liContainer}>
        {links.map(({ text, url, auth }) =>
          userLoggedIn
            ? auth !== false && (
                <Link href={url} key={url}>
                  {text}
                </Link>
              )
            : auth !== true && (
                <Link key={text} href={url}>
                  {text}
                </Link>
              )
        )}
      </List>
    </Box>
  );
}
