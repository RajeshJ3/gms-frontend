import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    marginTop: "100px",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.9)",
    padding: "100px 0px 80px 0px",
    color: "#999",
    [theme.breakpoints.down("sm")]: {
      padding: "80px 0px 60px 0px",
    },
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  icon: {
    cursor: "pointer",
    background: "#e1e1e1",
    color: "rgba(0,0,0,0.9)",
    padding: "5px",
    fontSize: "35px",
    margin: "0px 10px",
    borderRadius: "50%",
  },
  link: {
    cursor: "pointer",
    margin: "0px 7px",
    color: "#e1e1e1",
    fontSize: "13px",
    fontWeight: "bold",
    textDecoration: "none",
  },
  copyright: {
    color: "#999",
  },
}));

export default function Footer() {
  const classes = useStyles();
  let date = new Date();
  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Grid item xs={12} className={classes.grid}>
          <Link className={classes.link} to="/">
            Home
          </Link>
          |
          <Link className={classes.link} to="/dashboard">
            Dashboard
          </Link>
          |
          <Link className={classes.link} to="/signup">
            Register
          </Link>
        </Grid>
        <Grid item xs={12} className={clsx(classes.grid, classes.link)}>
          &#169; {date.getFullYear()}{" "}
          <Link className={clsx(classes.link, classes.copyright)} to="/">
            GYM Slate
          </Link>
        </Grid>
      </Container>
    </div>
  );
}
