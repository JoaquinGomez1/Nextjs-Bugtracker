import { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Modal,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { UserContext } from "../context/user";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  paper: {
    padding: theme.spacing(4),
    position: "absolute",
    transform: "translateY(50%)",
    width: "100%",
  },
  title: {
    width: "100%",
    marginRight: theme.spacing(2),
  },
  box: {
    "& > *": {
      margin: `${theme.spacing(2)}px 0`,
    },
  },
  selectContainer: {
    minWidth: "150px",
  },
}));

export default function NewIssueModal({ open, onClose, onSubmit }) {
  const { currentUser } = useContext(UserContext);
  const [data, setData] = useState({
    title: "",
    description: "",
    severity: "",
    author: currentUser.id,
  });
  const classes = useStyles();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData({ ...data, [name]: value });
  };

  // Set the author of the new issue once the user object loads
  useEffect(() => {
    setData({ ...data, author: currentUser.id });
  }, [currentUser]);

  return (
    <Modal open={open} onClose={onClose}>
      <Container maxWidth="md" className={classes.root}>
        <Paper className={classes.paper}>
          <Box className={classes.box} display="grid">
            <Typography variant="h6">Create a new Issue</Typography>
            <Box display="flex" justifyContent="space-between">
              <TextField
                onChange={handleChange}
                name="title"
                type="text"
                placeholder="Title"
                variant="outlined"
                className={classes.title}
              />
              <FormControl className={classes.selectContainer}>
                <InputLabel id="demo-simple-select-disabled-label">
                  Severity
                </InputLabel>
                <Select
                  labelId="demo-simple-select-disabled-label"
                  id="demo-simple-select-disabled"
                  value={data.severity}
                  onChange={handleChange}
                  name="severity"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"low"}>Low</MenuItem>
                  <MenuItem value={"medium"}>Medium</MenuItem>
                  <MenuItem value={"high"}>High</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              onChange={handleChange}
              name="description"
              type="text"
              multiline
              rows={6}
              placeholder="What is the issue about?"
              variant="outlined"
            />

            <Button
              onClick={() => onSubmit(data)}
              variant="contained"
              color="primary"
            >
              <AddIcon />
              Add Issue
            </Button>
          </Box>
          <pre>{JSON.stringify(data, null, 4)}</pre>
        </Paper>
      </Container>
    </Modal>
  );
}
