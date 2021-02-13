import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Edit } from "@material-ui/icons";
import axios from "axios";
import { DOMAIN, getToken } from "../../../store/utility";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");

  React.useEffect(() => {
    setTitle(props.title);
  }, [props.title]);

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
      url: `${DOMAIN}/gyms/batches/`,
      headers: { Authorization: `Token ${getToken}` },
      params: { id: props.id },
      data: {
        title: title,
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
    <div>
      <Edit color="primary" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit {props.title}</DialogTitle>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              id="title"
              label="Title"
              type="text"
              style={{ marginTop: 0 }}
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
        </form>
      </Dialog>
    </div>
  );
}
