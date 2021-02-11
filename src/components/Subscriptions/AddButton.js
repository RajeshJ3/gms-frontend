import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Add } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "30px",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: "22px",
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
  const [batch, setBatch] = React.useState("");
  const [member, setMember] = React.useState();
  const [membership, setMembership] = React.useState();
  const [subscriptionFrom, setSubscriptionFrom] = React.useState();
  const [subscriptionTill, setSubscriptionTill] = React.useState();
  const [amount, setAmount] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const members = [
    {
      value: 1,
      label: "Ankit Brijwasi",
    },
    {
      value: 2,
      label: "Rajesh Joshi",
    },
    {
      value: 3,
      label: "Navdeep",
    },
  ];
  const memberships = [
    {
      value: 1,
      label: "Bronze",
    },
    {
      value: 2,
      label: "Silver",
    },
    {
      value: 3,
      label: "Sold",
    },
    {
      value: 4,
      label: "Platinum",
    },

    {
      value: 5,
      label: "Diamond",
    },
  ];

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
        <DialogContent className={classes.dialog}>
          <form noValidate autoComplete="off">
            {member ? (
              <center>
                <Avatar
                  style={{ marginBottom: member ? "10px" : 0 }}
                  alt="Rajesh"
                  src="https://material-ui.com/static/images/avatar/2.jpg"
                />
              </center>
            ) : null}
            <Autocomplete
              freeSolo
              id="member"
              disableClearable
              options={members.map((option) => option.label)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Member"
                  margin="dense"
                  value={member}
                  onChange={(e) => setMember(e.target.value)}
                  InputProps={{ ...params.InputProps, type: "search" }}
                />
              )}
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
            <TextField
              id="membership"
              select
              label="Membership"
              value={membership}
              fullWidth
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
              label="Amount"
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
              className={classes.date}
              value={subscriptionTill}
              onChange={(e) => setSubscriptionTill(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
