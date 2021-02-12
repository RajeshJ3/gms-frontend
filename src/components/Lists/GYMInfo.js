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
  listItem: {
    minHeight: "70px",
  },
  value: {
    maxWidth: "250px",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "220px",
    },
  },
}));

export default function GYMInfo() {
  const classes = useStyles();

  const info = [
    {
      key: "Name",
      value: "Rajesh's GYM",
    },
    {
      key: "Email",
      value: "joshirajesh448@gmail.com",
    },
    {
      key: "Mobile",
      value: "9917531008",
    },
    {
      key: "Batch",
      value: "Morning",
    },
    {
      key: "Address",
      value:
        "Priyadarshini vihar, Gair Vaishali, Bithoriya no.1, Kusumkhera, Haldwani",
    },
  ];

  return (
    <Container maxWidth="xs">
      <List dense className={classes.root}>
        {info.map((value, index) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <div key={index}>
              <ListItem button className={classes.listItem}>
                <ListItemText id={labelId} primary={value.key} />
                <ListItemSecondaryAction>
                  <Typography
                    variant="body2"
                    align="right"
                    className={classes.value}
                  >
                    {value.value}
                  </Typography>
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
