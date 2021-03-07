import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Project Name",
  },
  { id: "issues", numeric: true, disablePadding: false, label: "Issues" },
  { id: "members", numeric: true, disablePadding: false, label: "Members" },
  { id: "actions", numeric: true, disablePadding: false, label: "Actions" },
];

export default function EnhancedTableHead(props) {
  const { order, orderBy } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
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
