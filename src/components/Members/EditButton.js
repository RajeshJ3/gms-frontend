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
import axios from "axios";
import { DOMAIN, getToken, getGymId } from "../../store/utility";

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
  input: {
    display: "none",
  },
}));

export default function AddButton(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [batch, setBatch] = React.useState("");
  const [batches, setBatches] = React.useState([]);
  const [image, setImage] = React.useState();

  React.useEffect(() => {
    setName(props.name);
    setEmail(props.email);
    setMobile(props.phone ? props.phone : "-");
    setBatch(props.batch_name ? props.batch_name : "-");
    setImage(props.image ? props.image : "-");
  }, [props.name, props.email, props.phone, props.batch_name, props.image]);

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
    let formData = new FormData();
    if (typeof image === "object") {
      formData.append("image", image[0]);
    }
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", mobile);
    if (typeof batch === "number") {
      formData.append("batch", batch);
    }
    axios
      .patch(`${DOMAIN}/members/`, formData, {
        headers: {
          Authorization: `Token ${getToken}`,
          "Content-Type": "multipart/form-data",
        },
        params: { id: props.id },
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
            <Avatar
              alt={name}
              src={
                typeof image === "object"
                  ? image && image.length && URL.createObjectURL(image[0])
                  : typeof image === "string" ? image : ""
              }
            />
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => setImage(e.target.files)}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="outlined"
                size="small"
                color="primary"
                component="span"
              >
                Upload
              </Button>
            </label>
          </div>

          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            margin="dense"
            id="mobile"
            label="Mobile"
            type="number"
            fullWidth
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
          <Button color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
