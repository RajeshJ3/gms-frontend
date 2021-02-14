import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { DOMAIN, getToken, getGymId } from "../../store/utility";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: "2px",
    },
  },
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
}));

const initialState = {
  name: "",
  email: "",
  phone: "",
};

export default function AddButton(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(initialState);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [batch, setBatch] = React.useState("");
  const [batches, setBatches] = React.useState([]);

  React.useEffect(() => {
    axios({
      method: "GET",
      url: `${DOMAIN}/gyms/batches/`,
      headers: { Authorization: `Token ${getToken}` },
      params: { gym: getGymId },
    })
      .then((res) => {
        setBatches([
          {
            value: -1,
            label: "Select..",
          },
          ...res.data.output.map((i) => ({
            value: i.id,
            label: i.title,
          })),
        ]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const stepTwo = () => {
    axios({
      method: "POST",
      url: `${DOMAIN}/members/`,
      headers: { Authorization: `Token ${getToken}` },
      data: {
        name: state.name,
        email: state.email,
        gym: getGymId,
        phone: state.phone ? state.phone : null,
        batch: batch,
      },
    })
      .then((res) => {
        console.log("[STEP 2] Member created");
        window.location.replace(`/members/${res.data.instance.id}`);
      })
      .catch((err) => {
        setLoading(false);
        console.log("[STEP 2] ERROR: member not created");
        console.log(err.request);
      });
  };

  const stepOne = (e) => {
    e.preventDefault();
    setLoading(true);
    axios({
      method: "GET",
      url: `${DOMAIN}/members/`,
      headers: { Authorization: `Token ${getToken}` },
      params: { email: state.email, gym: getGymId },
    })
      .then((res) => {
        if (res.data.output.length) {
          window.location.replace(`/members/${res.data.output[0].id}`);
          console.log("[Step 1] Already");
        } else {
          console.log("[Step 1] Not Found, Creating");
          stepTwo();
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.request);
      });
  };

  return (
    <div className={classes.root}>
      <IconButton aria-label="add" onClick={handleClickOpen} size="small">
        <AddCircle color="primary" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add member</DialogTitle>
        <form autoComplete="off" onSubmit={stepOne}>
          <DialogContent className={classes.dialog}>
            <TextField
              margin="dense"
              id="name"
              label="Name"
              required
              type="text"
              fullWidth
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
            <TextField
              margin="dense"
              id="phone"
              label="Mobile"
              required
              type="tel"
              fullWidth
              value={state.phone}
              onChange={(e) => setState({ ...state, phone: e.target.value })}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              required
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
            <TextField
              id="batch"
              select
              label="Batch"
              value={batch}
              fullWidth
              required
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
            <Button color="primary" type="submit" disabled={loading}>
              {loading ? "Loading.." : "Submit"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
