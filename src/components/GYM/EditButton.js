import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Edit } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { DOMAIN, getToken } from "../../store/utility";

const useStyles = makeStyles((theme) => ({
  dialog: {
    maxHeight: "400px",
    overflowY: "scroll",
  },
  button: {
    width: "50vw",
    maxWidth: "200px",
  },
  edit: {
    cursor: "pointer",
    fontSize: "20px",
    marginLeft: "12px",
    bottom: "0px",
  },
}));

export default function EditGYM(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    setName(props.name);
    setAddress(props.address);
  }, [props.name, props.address]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    axios({
      method: "PATCH",
      url: `${DOMAIN}/gyms/`,
      headers: { Authorization: `Token ${getToken}` },
      params: { id: props.id },
      data: {
        name: name,
        address: address,
      },
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <span>
        <Edit
          className={classes.edit}
          color="primary"
          onClick={handleClickOpen}
        />
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit GYM</DialogTitle>
        <DialogContent className={classes.dialog}>
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            autoComplete={false}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            multiline
            rows={3}
            autoComplete={false}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
