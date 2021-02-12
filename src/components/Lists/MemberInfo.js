import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { Container, Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "20px",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    [theme.breakpoints.down("sm")]: {
      marginTop: "20px",
    },
  },
}));

export default function MemberInfo(props) {
  const classes = useStyles();

  const info = [
    {
      key: "Name",
      value: props.name,
    },
    {
      key: "Email",
      value: props.email,
    },
    {
      key: "Mobile",
      value: props.mobile ? props.mobile : "-",
    },
    {
      key: "Batch",
      value: props.batch_title ? props.batch_title : "-",
    },
  ];

  return (
    <Container maxWidth="xs">
      <List dense className={classes.root}>
        {info.map((value, index) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <div key={index}>
              <ListItem button>
                <ListItemText id={labelId} primary={value.key} />
                <ListItemSecondaryAction>
                  <Typography variant="body2">{value.value}</Typography>
                </ListItemSecondaryAction>
              </ListItem>
              {!(index >= info.length - 1) ? (
                <Divider component="li"></Divider>
              ) : null}
            </div>
          );
        })}
      </List>
    </Container>
  );
}
