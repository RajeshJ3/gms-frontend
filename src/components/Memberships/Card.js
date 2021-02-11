import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import { Edit, Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight:"87px"
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <>
          <IconButton aria-label="settings">
            <Edit color="primary" />
          </IconButton>
          <IconButton aria-label="add to favorites">
          <Delete style={{ color:"red" }} />
        </IconButton>
          </>
        }
        title={props.title}
        className={classes.title}
        subheader={`Rs. ${props.amount}`}
      />
    </Card>
  );
}
