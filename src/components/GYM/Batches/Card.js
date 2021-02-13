import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import DeleteBatch from './DeleteBatch'
import EditBatch from './EditBatch'

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <>
            <IconButton size="small" aria-label="settings">
              <EditBatch {...props} fontSize="small" />
            </IconButton>
            <IconButton size="small" aria-label="add to favorites">
            <DeleteBatch {...props} fontSize="small" />
            </IconButton>
          </>
        }
        title={<span style={{ fontSize: '17px' }}>{props.title}</span>}
        className={classes.title}
      />
    </Card>
  );
}
