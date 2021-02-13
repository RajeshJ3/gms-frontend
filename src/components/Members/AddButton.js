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
      marginTop: "22px",
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

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
};

export default function AddButton(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(initialState);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const stepThree = () => {
    axios({
      method: "POST",
      url: `${DOMAIN}/members/`,
      headers: { Authorization: `Token ${getToken}` },
      data: {
        name: state.firstName + " " + state.lastName,
        gym: getGymId,
        email: state.email,
      },
    })
      .then((res) => {
        console.log("[STEP 3] Member created");
        window.location.replace(`/members/${res.data.output.id}`);
      })
      .catch((err) => {
        console.log("[STEP 3] ERROR: member not created");
        console.log(err.request);
      });
  };

  const stepTwo = () => {
    axios({
      method: "GET",
      url: `${DOMAIN}/members/`,
      headers: { Authorization: `Token ${getToken}` },
      params: { email: state.email, gym: getGymId },
    })
      .then((res) => {
        // user exists for this gym id
        if (res.data.output.length) {
          console.warn("you have added this member");
          window.location.replace(`/members/${res.data.output[0].user}`);
        } else {
          stepThree();
        }
      })
      .catch((err) => {
        // error
        console.log(err.request);
      });
  };

  const stepOne = () => {
    setLoading(true);
    let pswd = makeid(10) + "@" + makeid(10);
    axios
      .post(`${DOMAIN}/auth/registration/`, {
        first_name: state.firstName,
        last_name: state.lastName,
        email: state.email,
        password1: pswd,
        password2: pswd,
        user_type: "member",
      })
      .then((res) => {
        // user created and member profile created
        console.log("[STEP 1] User created");
        window.location.replace(`/members/${res.data.id}`);
      })
      .catch((err) => {
        console.log("[STEP 1] User already");
        let errorExist = JSON.parse(err.request.response);
        if (
          errorExist.email[0] ===
          "A user is already registered with this e-mail address."
        ) {
          stepTwo();
        }
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
        <DialogContent className={classes.dialog}>
          <TextField
            margin="dense"
            id="firstName"
            label="First Name"
            required
            type="text"
            fullWidth
            value={state.firstName}
            onChange={(e) => setState({ ...state, firstName: e.target.value })}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            required
            type="text"
            fullWidth
            value={state.lastName}
            onChange={(e) => setState({ ...state, lastName: e.target.value })}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={stepOne} disabled={loading}>
            {loading ? "Loading.." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
