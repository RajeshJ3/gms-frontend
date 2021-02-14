import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Add } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DOMAIN, getToken, getGymId } from "../../store/utility";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "30px",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: "18px",
      marginBottom: "25px",
    },
  },
  dialog: {
    maxHeight: "400px",
    overflowY: "scroll",
  },
  button: {
    width: "50vw",
    maxWidth: "200px",
  },
  date: {
    marginTop: "10px",
  },
}));

export default function AddButton(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [member, setMember] = React.useState("");
  const [members, setMembers] = React.useState([]);
  const [batch, setBatch] = React.useState("");
  const [batches, setBatches] = React.useState([]);
  const [membership, setMembership] = React.useState();
  const [memberships, setMemberships] = React.useState([]);
  const [subscriptionFrom, setSubscriptionFrom] = React.useState();
  const [subscriptionTill, setSubscriptionTill] = React.useState();
  const [amount, setAmount] = React.useState();

  React.useEffect(() => {
    setLoading(true);
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

  React.useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${DOMAIN}/members/`,
      headers: { Authorization: `Token ${getToken}` },
      params: { gym: getGymId },
    })
      .then((res) => {
        setMembers([
          {
            value: -1,
            label: "Select..",
            image: "",
          },
          ...res.data.output.map((i) => ({
            value: i.id,
            label: i.name,
            image: i.image,
          })),
        ]);
        setLoading(false);
        if (props.memberId) {
          setMember(props.memberId);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [props.memberId]);

  React.useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${DOMAIN}/gyms/memberships/`,
      headers: { Authorization: `Token ${getToken}` },
      params: { gym: getGymId },
    })
      .then((res) => {
        setMemberships([
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios({
      method: "POST",
      url: `${DOMAIN}/members/subscription/`,
      headers: { Authorization: `Token ${getToken}` },
      data: {
        member: member,
        batch: batch,
        membership: membership,
        amount: amount ? amount || amount === 0 : null,
        valid_from: subscriptionFrom,
        valid_till: subscriptionTill,
      },
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(JSON.parse(err.request.response));
        setLoading(false);
      });
  };

  return (
    <div className={classes.root}>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        className={classes.button}
        color="primary"
        size="small"
        disableElevation
        startIcon={<Add />}
      >
        {props.title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Subscription</DialogTitle>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent className={classes.dialog}>
            <TextField
              id="member"
              select
              label="Member"
              value={member}
              fullWidth
              required
              margin="dense"
              SelectProps={{
                native: true,
              }}
              onChange={(e) => setMember(e.target.value)}
            >
              {members.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
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
            <TextField
              id="membership"
              select
              label="Membership"
              value={membership}
              fullWidth
              required
              margin="dense"
              SelectProps={{
                native: true,
              }}
              onChange={(e) => setMembership(e.target.value)}
            >
              {memberships.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              margin="dense"
              id="amount"
              label="Amount (optional)"
              type="number"
              style={{ marginTop: 0 }}
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <TextField
              id="dateFrom"
              label="Subscription From"
              type="date"
              fullWidth
              required
              value={subscriptionFrom}
              onChange={(e) => setSubscriptionFrom(e.target.value)}
              className={classes.date}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="dateTill"
              label="Subscription Till"
              type="date"
              fullWidth
              required
              className={classes.date}
              value={subscriptionTill}
              onChange={(e) => setSubscriptionTill(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit" disabled={loading}>
              {loading ? "Saving.." : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
