import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import EditButton from "./EditButton";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "20px",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "10px",
    },
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: "10px",
  },
}));

export default function Title(props) {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.root} variant="h5">
        {props.avatarUrl || props.avatarUrl === "" ? (
          <Avatar
            alt={classes.name}
            className={classes.avatar}
            src={props.avatarUrl}
          />
        ) : null}
        {props.title}
        {props.edit ? <EditButton {...props} /> : null}
      </Typography>
    </>
  );
}
