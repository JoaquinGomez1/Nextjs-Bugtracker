import { useContext, useState } from "react";
import { IconButton, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import { UserContext } from "../context/user";
import BaseModal from "./BaseModal";
import ConfirmModal from "./ConfirmModal";

import pink from "@material-ui/core/colors/pink";
import headers from "../headers";

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
  projectId,
  modalOpen,
  members,
  onClose,
  projectOwner,
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [projectMembers, setProjectMembers] = useState(members);
  const [memberToDeleteID, setMemberToDeleteID] = useState();
  const { currentUser } = useContext(UserContext);
  const classes = useStyles();
  const userIsAllowedToDelete =
    currentUser.id === projectOwner || currentUser.user_role === "admin";

  const handleConfirmDelete = async () => {
    if (!memberToDeleteID) return; // Making sure the user has to be deleted

    const URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/projects/users/delete";
    const reqHeaders = headers;
    reqHeaders.method = "DELETE";
    reqHeaders.body = JSON.stringify({
      projectId,
      userId: memberToDeleteID,
    });
    const req = await fetch(URL, reqHeaders);

    if (req.status === 200) {
      setProjectMembers(
        [...projectMembers].filter(
          (member) => member.user_id !== memberToDeleteID
        )
      );
      setShowConfirmModal(false);
    }
  };

  return (
    <BaseModal open={modalOpen} onClose={onClose}>
      <Typography className={classes.header} variant="h4">
        View members
      </Typography>
      <Box display="grid" className={classes.gridContainer}>
        {projectMembers.map((member) => (
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
            {userIsAllowedToDelete && (
              <Box display="flex">
                <IconButton
                  onClick={() => {
                    setMemberToDeleteID(member.user_id);
                    setShowConfirmModal(true);
                  }}
                >
                  <DeleteIcon style={{ color: pink[600] }} />
                </IconButton>
              </Box>
            )}
          </div>
        ))}
      </Box>
      <ConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        prompt="Are you sure you want to delete this user from the project? "
      />
    </BaseModal>
  );
}
