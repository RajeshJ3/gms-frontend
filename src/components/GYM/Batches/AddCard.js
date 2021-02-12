import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Add } from "@material-ui/icons";
import { CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
    userSelect: "none",
  },
  icon: {
    fontSize: "25px",
    marginBottom: "-5px",
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" align="center">
          <Add className={classes.icon} /> Add Batch
        </Typography>
      </CardContent>
    </Card>
  );
}
