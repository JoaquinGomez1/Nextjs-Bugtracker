import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useState,
} from "react";
import {
  TextField,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import { makeStyles } from "@material-ui/core/styles";
import { IIssue } from "../interfaces/issue";

interface Props {
  issues: IIssue[];
  setIssues: Dispatch<SetStateAction<IIssue[]>>;
}

const priorityNumbers = {
  low: 1,
  medium: 2,
  high: 3,
};

export default function IssuesFilterBar({ issues, setIssues }: Props) {
  const classes = useStyles();
  const [radioValue, setRadioValue] = useState("");
  const [inputFieldValue, setInputFieldValue] = useState("");

  const handleChange = (event: any) => {
    setRadioValue(event.target.value);
    if (radioValue === event.target.value) {
      setIssues(issues);
      return setRadioValue("");
    }

    const issuesCopy = [...issues];
    let sorterFunction;
    if (event.target.value === "high")
      sorterFunction = (a: IIssue, b: IIssue) =>
        priorityNumbers[b.issue_severity] - priorityNumbers[a.issue_severity];
    if (event.target.value === "low")
      sorterFunction = (a: IIssue, b: IIssue) =>
        priorityNumbers[a.issue_severity] - priorityNumbers[b.issue_severity];
    if (event.target.value === "medium") sorterFunction = () => 0;

    issuesCopy.sort(sorterFunction);
    setIssues(issuesCopy);
  };

  const handleInputFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputFieldValue(value);
    setIssues(
      issues.filter((issue) =>
        `${issue.issue_name}`.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <Box display="flex" className={classes.root}>
      <Box>
        <TextField
          onChange={handleInputFieldChange}
          variant="outlined"
          value={inputFieldValue}
          placeholder="Type an issue here"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        className={classes.filterContainer}
      >
        <Box display="flex" alignItems="center" className={classes.filterLabel}>
          <FilterListIcon style={{ margin: "0 8px" }} />
          <Typography variant="subtitle1">Sort by priority</Typography>
        </Box>
        <RadioGroup value={radioValue} className={classes.formControl}>
          <FormControlLabel
            onClick={handleChange}
            value="low"
            control={<Radio />}
            label="Low"
          />
          <FormControlLabel
            onClick={handleChange}
            value="medium"
            control={<Radio />}
            label="Medium"
          />
          <FormControlLabel
            onClick={handleChange}
            value="high"
            control={<Radio />}
            label="High"
          />
        </RadioGroup>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px 0`,
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "left",
      justifyContent: "left",
    },
  },
  formControl: { display: "flex", alignItems: "center", flexDirection: "row" },
  filterLabel: {
    margin: `0 ${theme.spacing(3)}px`,
    color: theme.palette.grey[300],
    [theme.breakpoints.down("sm")]: {
      margin: `${theme.spacing(3)}px 0`,
    },
  },
  filterContainer: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));
