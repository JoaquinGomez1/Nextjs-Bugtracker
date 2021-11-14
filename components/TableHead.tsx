import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import { ITheme } from "../theme";

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    backgroundColor: theme?.palette?.primary?.main,
  },
  headName: {
    color: "rgba(0,0,0,.6)",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
}));

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Project Name",
  },
  { id: "members", numeric: true, disablePadding: false, label: "Members" },
  { id: "actions", numeric: true, disablePadding: false, label: "Actions" },
];

// TODO: Asign proper props type
export default function EnhancedTableHead(props: any) {
  const { order, orderBy } = props;
  const classes = useStyles();

  return (
    <TableHead className={classes.root}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.headName}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
