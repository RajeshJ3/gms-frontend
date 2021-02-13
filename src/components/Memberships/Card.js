import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import DeleteMembership from "./DeleteMembership";
import EditMembership from "./EditMembership";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "87px",
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <>
            <IconButton aria-label="edit">
              <EditMembership {...props} />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteMembership {...props} />
            </IconButton>
          </>
        }
        title={<span style={{ fontSize: '17px' }}>{props.title}</span>}
        className={classes.title}
        subheader={
          <span style={{ fontSize: '14px' }}>{`Rs. ${props.amount}`}</span>}
      />
    </Card>
  );
}
