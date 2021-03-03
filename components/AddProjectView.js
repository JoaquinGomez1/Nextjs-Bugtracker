import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Box,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    width: "100%",
    marginTop: theme.spacing(4),
  },
  title: {
    margin: `${theme.spacing(2)}px 0`,
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
    border: `2px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(2),
    maxWidth: "100%",
    borderRadius: "5px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  memberBox: {
    padding: " 4px 8px",
    borderRadius: "4px",
    margin: "4px 0 ",

    "&:hover": {
      backgroundColor: "rgba(0,0,0,.2)",
      cursor: "pointer",
      borderLeft: `4px solid ${theme?.palette?.primary?.main}`,
    },
  },

  submitButton: {
    padding: `10px 0 `,
  },
  deleteIcon: {
    "&:hover": { color: theme.palette.primary.light },
  },
  subtitle: { color: theme?.palette?.subtitles?.high },
}));

export default function AddProjectView({ actions }) {
  const {
    handleChange,
    fieldsValue,
    handleAddMember,
    disableButton,
    handleSubmit,
    members,
    removeMemberFromList,
  } = actions;
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Paper elevation={1} className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          <AddIcon color="primary" /> Add Project
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
                type="number"
                name="member"
                fullWidth
                autoComplete="false"
                placeholder="Project Member Id"
                value={fieldsValue.member}
                onKeyDown={({ key }) => key === "Enter" && handleAddMember()}
              />
              <Button
                variant="outlined"
                color="primary"
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
              {members.map((member, index) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  className={classes.memberBox}
                  key={Math.random()}
                >
                  <Typography variant="h6" className={classes.subtitle}>
                    {" "}
                    {member}{" "}
                  </Typography>
                  <HighlightOffIcon
                    className={classes.deleteIcon}
                    color="primary"
                    onClick={() => removeMemberFromList(index)}
                  />
                </Box>
              ))}
            </Paper>
          </div>
        </div>

        <Container maxWidth="sm">
          <Button
            className={classes.submitButton}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Add project
          </Button>
        </Container>
      </Paper>
    </Container>
  );
}
