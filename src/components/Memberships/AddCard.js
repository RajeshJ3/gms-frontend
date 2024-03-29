import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Add } from "@material-ui/icons";
import {
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";
import { DOMAIN, getToken, getGymId } from "../../store/utility";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
    userSelect: "none",
    [theme.breakpoints.up("sm")]: {
      minHeight: "87px",
    },
  },
  icon: {
    fontSize: "25px",
    marginBottom: "-5px",
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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
      url: `${DOMAIN}/gyms/memberships/`,
      headers: { Authorization: `Token ${getToken}` },
      data: {
        title: title,
        price: amount,
        gym: getGymId,
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
      <Card className={classes.root}>
        <CardContent onClick={handleClickOpen}>
          <Typography variant="h6" align="center">
            <Add className={classes.icon} /> Add Membership
          </Typography>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Membership</DialogTitle>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent className={classes.dialog}>
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
    </>
  );
}
