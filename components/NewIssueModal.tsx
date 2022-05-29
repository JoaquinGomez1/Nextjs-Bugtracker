import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useUserProvider } from "../context/user";
import BaseModal from "./BaseModal";
import Alert from "./Alert";

import InfoIcon from "@material-ui/icons/Info";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

interface NewIssueDto {
  title: string;
  description: string;
  severity: string;
  author?: number;
}

export default function NewIssueModal({ open, onClose, onSubmit }: Props) {
  const { currentUser } = useUserProvider();
  const [data, setData] = useState<NewIssueDto>({
    title: "",
    description: "",
    severity: "",
    author: currentUser?.id,
  });
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");

  // Controls the alert pop up
  const timeout = 3000;

  const handleChange = ({ target }: any) => {
    const { name, value } = target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    const thereAreUndefinedValues = Object.values(data).some((value) => !value);
    if (thereAreUndefinedValues) {
      setErrorMessage("There cant be undefined values");
      setTimeout(() => {
        setErrorMessage("");
      }, timeout);
    } else onSubmit(data);
  };

  // Set the author of the new issue once the user object loads
  useEffect(() => {
    setData({ ...data, author: currentUser?.id });
  }, [currentUser]);

  return (
    <BaseModal open={open} onClose={onClose}>
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
                <em> - </em>
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

        <Button onClick={handleSubmit} variant="contained" color="primary">
          <AddIcon />
          Add Issue
        </Button>

        {errorMessage && (
          <Alert success={false}>
            <Box
              display="flex"
              style={{ width: "100%" }}
              justifyContent="space-between"
            >
              <Typography>{errorMessage}</Typography>
              <InfoIcon />
            </Box>
          </Alert>
        )}
      </Box>
    </BaseModal>
  );
}

const useStyles = makeStyles((theme) => ({
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
