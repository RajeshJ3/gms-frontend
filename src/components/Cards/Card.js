import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    minHeight: "150px",
  },
  title: {
    fontSize: "23px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    },
  },
  bottom:{
    position: "absolute",
    bottom: 0
  }
}));

export default function CustomCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          {props.icon} {props.title}
        </Typography>
        <Typography color="textSecondary">
          {props.value}
        </Typography>
      </CardContent>
      <CardActions className={classes.bottom}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          disableElevation
          component={Link}
          to={props.link}
        >
          {props.linkText}
        </Button>
      </CardActions>
    </Card>
  );
}
