import { useState, useEffect, useContext } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { ProjectsContext } from "../../context/projects";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    width: "100%",
    marginTop: theme.spacing(4),
  },
  container: {
    display: "flex",
  },
  texfield: {
    display: "block",
    margin: "15px 0",
  },
  addMembersArea: {
    display: "flex",
    "& > button": {
      margin: " 0 10px",
    },
  },
  right: {
    display: "inline",
    width: "50%",
    padding: theme.spacing(2),
  },
  alignRight: {
    display: "grid",
    justifyContent: "right",
  },
  membersList: {
    border: `2px solid ${theme.palette.secondary.main}`,
    padding: theme.spacing(2),
    maxWidth: "100%",
    borderRadius: "5px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },

  submitButton: {
    padding: `10px 0 `,
  },
}));

export default function NewProject() {
  const { projects, setProjects } = useContext(ProjectsContext);
  const classes = useStyles();
  const [members, setMembers] = useState([]);
  const [fieldsValue, setFieldsValue] = useState({
    projectName: "",
    projectDescription: "",
    member: { id: Math.random(), name: "" },
  });
  const [disableButton, setDisableButton] = useState(true);

  const handleAddMember = () => {
    const isMemberNameEmpty = fieldsValue.member.name ? false : true;
    if (!isMemberNameEmpty) {
      setMembers([...members, fieldsValue.member]);
      setFieldsValue({
        ...fieldsValue,
        member: { id: Math.random(), name: "" },
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "member") {
      setFieldsValue({
        ...fieldsValue,
        member: { id: fieldsValue.member.id, name: value },
      });
    } else setFieldsValue({ ...fieldsValue, [name]: value });
  };

  const handleSubmit = () => {
    const thereIsOneUndefinedValue = Object.values(fieldsValue).some(
      (value) => !value
    );
    const thereAreMembers = members.length >= 1;

    if (!thereIsOneUndefinedValue && thereAreMembers) {
      const object = {
        author: "undefined for now",
        name: fieldsValue.projectName,
        issues: 0,
        members,
        actions: 2,
        description: fieldsValue.projectDescription,
        url: "/projects/Change_this_for_a_valid_url_path",
      };
      setProjects([...projects, object]);
    }
  };

  useEffect(() => {
    fieldsValue.member.name ? setDisableButton(false) : setDisableButton(true);
  }, [fieldsValue]);

  return (
    <Container maxWidth="lg">
      <Paper elevation={1} className={classes.root}>
        <Typography variant="h4" color="white">
          <AddIcon color="secondary" /> Add Project
        </Typography>
        <Divider />
        <div className={classes.container}>
          <form onChange={handleChange} className={classes.right}>
            <TextField
              fullWidth
              variant="outlined"
              name="projectName"
              autoComplete="false"
              placeholder="Project's Name"
              className={classes.texfield}
              value={fieldsValue.projectName}
            />
            <TextField
              variant="outlined"
              name="projectDescription"
              fullWidth
              autoComplete="false"
              placeholder="Project's Description"
              className={classes.texfield}
              multiline
              rows={4}
              value={fieldsValue.projectDescription}
            />
            <div className={classes.addMembersArea + " " + classes.texfield}>
              <TextField
                variant="outlined"
                name="member"
                fullWidth
                autoComplete="false"
                placeholder="Project's Members"
                value={fieldsValue.member.name}
              />
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleAddMember}
                disabled={disableButton}
              >
                <AddIcon /> Add
              </Button>
            </div>
          </form>
          <div className={classes.right + " " + classes.alignRight}>
            <Paper elevation={2} className={classes.membersList}>
              <Typography variant="h5"> Member's List</Typography>
              <Divider />
              {members.map((member) => (
                <Typography variant="h6"> {member.name} </Typography>
              ))}
            </Paper>
          </div>
        </div>

        <Container maxWidth="sm">
          <Button
            className={classes.submitButton}
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
          >
            Add project
          </Button>
        </Container>
        {/* <pre>{JSON.stringify(fieldsValue, null, 4)}</pre> */}
      </Paper>
    </Container>
  );
}
