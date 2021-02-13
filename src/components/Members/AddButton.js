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

export default function AddButton(props) {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({});
  const [success, setSuccess] = React.useState(true);
  const [created, setCreated] = React.useState(false);
  const [batch, setBatch] = React.useState("");
  const [batches, setBatches] = React.useState([]);


  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");


  // Batch
  React.useEffect(() => {
    axios({
      method: "GET",
      url: `${DOMAIN}/gyms/batches/`,
      headers: { Authorization: `Token ${getToken}` },
      params: { gym: getGymId },
    })
      .then((res) => {
        let temp = res.data.output.map((i) => ({
          value: i.id,
          label: i.title,
        }));
        setBatches([{ value: -1, label: "Select.." }, ...temp]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.request);
        setLoading(false);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getOrCreateUser = (e) => {
    e.preventDefault();
    let pswd = makeid(10) + "@" + makeid(10);
    axios
      .post(`${DOMAIN}/auth/registration/`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password1: pswd,
        password2: pswd,
        user_type: "member",
      })
      .then((res) => {
        setCreated(true);
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        let errorExist = JSON.parse(err.request.response);
        setError(errorExist);
        console.log(errorExist);
        if (errorExist.email) {
          setSuccess(true);
        }
        setLoading(false);
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
            type="text"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Button color="primary" onClick={getOrCreateUser} disabled={loading}>
            {loading ? "Creating" : "Next"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
