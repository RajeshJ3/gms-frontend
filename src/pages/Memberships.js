import React from "react";
import CardList from "../components/Memberships/CardList";
import Title from "../components/Typographies/Title";
import Progress from "../components/errors/Progress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "20px",
  },
}));

export default function Index(props) {
  const classes = useStyles();

  return props.isAuthenticated ? (
    <div className={classes.root}>
      <Title title="Memberships" />
      <CardList />
    </div>
  ) : (
    <Progress />
  );
}
