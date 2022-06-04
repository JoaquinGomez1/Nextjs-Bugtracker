import { Box, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useUserProvider } from "../context/user";
import { ILink } from "../interfaces/link";
import Link from "./CustomLink";

interface Props {
  links: ILink[];
  userLoggedIn: boolean;
}

export default function DesktopMenu({ links, userLoggedIn, ...rest }: Props) {
  const classes = useStyles();
  const { currentUser, logUserOut } = useUserProvider();

  return (
    <Box className={classes.desktopMenu} {...rest}>
      <List className={classes.liContainer}>
        {!!currentUser && (
          <Typography>
            Hello!{" "}
            <span className={classes.span}> {currentUser?.username}</span>
          </Typography>
        )}
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

        {currentUser && (
          <div onClick={logUserOut}>
            <Link href="">Logout</Link>
          </div>
        )}
      </List>
    </Box>
  );
}

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
    listStyle: "none",
  },
  span: {
    fontWeight: "bold",
  },
}));
