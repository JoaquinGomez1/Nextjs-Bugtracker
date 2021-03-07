import BaseModal from "./BaseModal";
import { Button, Box, Typography } from "@material-ui/core";
// import pink from "@material-ui/core/colors/pink";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  confirm: {},
  cancel: {
    backgroundColor: theme.palette.grey[700],
    color: "white",
    "&:hover": { backgroundColor: theme.palette.grey[900] },
  },
  btnContainer: {
    width: "70vw",
    maxWidth: "350px",
  },
}));

export default function ConfirmModal({ onConfirm, onCancel, prompt, ...rest }) {
  const classes = useStyles();

  return (
    <BaseModal {...rest}>
      <Typography
        variant="h5"
        style={{ textAlign: "center", margin: "32px 0" }}
      >
        {" "}
        {prompt}
      </Typography>
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          justifyContent="space-between"
          className={classes.btnContainer}
          alignItems="center"
        >
          <Button
            variant="contained"
            onClick={onCancel}
            className={classes.cancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.confirm}
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </BaseModal>
  );
}
