import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Edit } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  const [name, setName] = React.useState("Rajesh's GYM");
  const [email, setEmail] = React.useState("joshirajesh448@gmail.com");
  const [mobile, setMobile] = React.useState("9876543210");
  const [address, setAddress] = React.useState(
    "Priyadarshini vihar, Gair Vaishali, Bithoriya no.1, Kusumkhera, Haldwani"
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            autoComplete={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="mobile"
            label="Mobile"
            type="number"
            fullWidth
            autoComplete={false}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
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
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
