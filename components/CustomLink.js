import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: `0 ${theme.spacing(1)}px`,
    margin: `0 ${theme.spacing(1)}px`,
    border: "2px solid transparent",
    position: "relative",
    "&:hover > div": {
      width: "100%",
    },
  },
  bottomLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    transition: ".15s all ease-in",
    width: 0,
    height: "2px",
    backgroundColor: theme.palette.grey[800],
    borderRadius: "4px",
  },
  activeLink: {
    fontWeight: "bold",
    "& > div": {
      maxWidth: "0",
    },
  },
}));

export default function CustomLink(props) {
  const classes = useStyles();
  const router = useRouter();

  const isActiveLink = router.pathname === props.href;
  const componentClassName = isActiveLink
    ? `${classes.activeLink} ${classes.listItem} `
    : classes.listItem;
  return (
    <li className={componentClassName}>
      <Link href={props.href}>
        <a>{props.children}</a>
      </Link>
      <div className={classes.bottomLine} />
    </li>
  );
}
