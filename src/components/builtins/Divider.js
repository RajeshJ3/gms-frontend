import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "20px",
    },
  },
}));

export default function Index() {
  const classes = useStyles();
  return <Divider className={classes.root} variant="middle" />;
}
