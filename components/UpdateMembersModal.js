import { useContext } from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import { UserContext } from "../context/user";
import BaseModal from "./BaseModal";

import pink from "@material-ui/core/colors/pink";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(2),
    "&:nth-child(even)": {
      backgroundColor: "rgba(0,0,0,.1)",
    },
  },
  author: {
    display: "flex",
    alignItems: "center",
    "& > svg": {
      margin: "0 8px",
    },
  },
  header: {
    padding: theme.spacing(2),
  },
  gridContainer: {
    maxHeight: "500px",
    overflowY: "scroll",
  },
}));

export default function UpdateMembersModal({
  modalOpen,
  members,
  onClose,
  projectOwner,
}) {
  const { currentUser } = useContext(UserContext);
  const classes = useStyles();
  return (
    <BaseModal open={modalOpen} onClose={onClose}>
      <Typography className={classes.header} variant="h4">
        {" "}
        View members
      </Typography>
      <Box display="grid" className={classes.gridContainer}>
        {members.map((member) => (
          <div key={member.user_id} className={classes.row}>
            <div>
              <Box display="flex" alignItems="center">
                <Typography variant="h6">{member.username}</Typography>
              </Box>
              <Typography variant="subtitle2" className={classes.author}>
                <PersonIcon color="primary" />
                {member.user_id}
              </Typography>
            </div>
            {currentUser.id === projectOwner && (
              <Box display="flex">
                <Button>
                  <DeleteIcon style={{ color: pink[400] }} />
                </Button>
              </Box>
            )}
          </div>
        ))}
      </Box>
    </BaseModal>
  );
}
