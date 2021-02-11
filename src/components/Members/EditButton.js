import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Edit } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  dialog: {
    maxHeight: "400px",
    overflowY: "scroll",
  },
  imageWrapper: {
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
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

export default function AddButton(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState(
    "https://material-ui.com/static/images/avatar/2.jpg"
  );
  const [name, setName] = React.useState("Rajesh Joshi");
  const [email, setEmail] = React.useState("joshirajesh448@gmail.com");
  const [mobile, setMobile] = React.useState("9876543210");
  const [batch, setBatch] = React.useState("morning");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const batches = [
    {
      value: "morning",
      label: "Morning",
    },
    {
      value: "noon",
      label: "Noon",
    },
    {
      value: "evening",
      label: "Evening",
    },
  ];

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
        <DialogTitle id="form-dialog-title">Edit member profile</DialogTitle>
        <DialogContent className={classes.dialog}>
          <div className={classes.imageWrapper}>
            <Avatar alt={name} src={image} />
            <Button variant="outlined" size="small" color="primary">
              Upload
            </Button>
          </div>
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
            id="batch"
            select
            label="Batch"
            value={batch}
            fullWidth
            margin="dense"
            SelectProps={{
              native: true,
            }}
            onChange={(e) => setBatch(e.target.value)}
          >
            {batches.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
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
