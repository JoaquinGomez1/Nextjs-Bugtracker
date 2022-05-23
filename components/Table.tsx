import { useState, useEffect, useContext, SyntheticEvent } from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Link from "next/link";
import { useRouter } from "next/router";

import EnhancedTableHead from "./TableHead";

import { fadeIn, growFromLeft } from "../libs/animations";
import { AnimatePresence, motion } from "framer-motion";
import { useUserProvider } from "../context/user";
import { ITheme } from "../theme";
import IProject from "../interfaces/project";

const FramerTableRow = motion(TableRow);

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    marginLeft: theme.spacing(4),
  },
}));

// TODO: Asign proper types

interface EnhancedTableToolbarProps {
  numSelected: number;
}
const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar>
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle" component="div">
            Projects
          </Typography>
        )}
        <Link href="/projects/new">
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
          >
            {" "}
            <AddIcon /> Add Project
          </Button>
        </Link>
      </div>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  row: {
    color: theme.palette.text.primary,
    "&:hover": {
      cursor: "pointer",
    },
  },
  progress: {
    width: "50px",
    margin: "0 auto",
  },
  rowMembers: {
    color: theme.palette.grey[400],
  },
}));

interface EnhancedTableProps {
  rows: IProject[] | undefined;
  handleDeleteProject: (id: number, index: number) => any;
}

export default function EnhancedTable({
  rows,
  handleDeleteProject,
}: EnhancedTableProps) {
  const classes = useStyles();
  const [order] = useState("asc");
  const [orderBy] = useState("name");
  const [selected, setSelected] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [dense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [noRows, setNoRows] = useState(rows?.length! <= 0 ?? true);
  const { currentUser } = useUserProvider();
  const userIsAllowedToDelete = (row: any) =>
    currentUser?.user_role === "admin" || currentUser?.id === row.project_owner;

  const router = useRouter();

  useEffect(() => {
    setNoRows(rows?.length! <= 0 ?? true);
  }, [rows]);

  const handleSelectAllClick = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      const newSelecteds = rows?.map((n: any) => n.name);
      setSelected(newSelecteds!);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleReRoute = ({ target }: any, id: number) => {
    // Only redirect if the element that was clicked
    // is not included in conditions array
    const conditions = ["button", "span", "path"];
    if (!conditions.includes(target?.tagName?.toLowerCase()))
      router.push(`/projects/${id}`);
  };

  const handleChangeRowsPerPage = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setRowsPerPage(parseInt(target.value));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows?.length ?? 0 - page * rowsPerPage);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="show"
      style={{
        position: "relative",
        transformOrigin: "top",
        overflow: "hidden",
      }}
    >
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                rowCount={rows?.length}
              />
              <TableBody style={{ position: "relative" }}>
                {noRows ? (
                  <Typography
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      marginTop: "30px",
                      width: "15rem",
                      textAlign: "center",
                    }}
                    className={classes.progress}
                    variant="subtitle1"
                  >
                    It appears that there are no projects to show
                  </Typography>
                ) : (
                  <AnimatePresence exitBeforeEnter>
                    {rows
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row: IProject, index: number) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <FramerTableRow
                            variants={growFromLeft}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            custom={index}
                            onClick={(e) => handleReRoute(e, row.id)}
                            hover
                            tabIndex={-1}
                            className={classes.row}
                            key={row.id}
                            style={{ transformOrigin: "left" }}
                          >
                            <TableCell component="th" id={labelId} scope="row">
                              {row.title || row.project_name}
                            </TableCell>

                            <TableCell
                              align="right"
                              className={classes.rowMembers}
                            >
                              {row.project_members?.length || 0}
                            </TableCell>
                            <TableCell align="right">
                              {userIsAllowedToDelete(row) && (
                                <Button
                                  color="primary"
                                  onClick={() =>
                                    handleDeleteProject(row.id, index)
                                  }
                                >
                                  <DeleteIcon />
                                </Button>
                              )}
                            </TableCell>
                          </FramerTableRow>
                        );
                      })}
                  </AnimatePresence>
                )}

                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={rows?.length ?? 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </motion.div>
  );
}
