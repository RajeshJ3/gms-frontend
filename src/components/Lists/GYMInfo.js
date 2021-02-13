import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { Container, Typography, Divider } from "@material-ui/core";
import Title from "../Typographies/Title";
import axios from "axios";
import { DOMAIN, getToken, getGymId } from "../../store/utility";
import Progress from "../errors/Progress";

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
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  const [info, setInfo] = React.useState([]);

  React.useEffect(() => {
    axios({
      method: "GET",
      url: `${DOMAIN}/gyms/`,
      headers: { Authorization: `Token ${getToken}` },
      params: { id: getGymId },
    })
      .then((res) => {
        console.log();
        setData(res.data.output.length ? res.data.output[0] : {});
        let temp = [];
        if (res.data.output.length && res.data.output[0]) {
          temp = [
            ...temp,
            ...[
              {
                key: "Name",
                value: res.data.output[0].name,
              },
              {
                key: "Address",
                value: res.data.output[0].address
                  ? res.data.output[0].address
                  : "-",
              },
            ],
          ];
        }
        setInfo(temp);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Title title={loading ? "Loading.." : data.name} edit={true} {...data} gym={true} />
      <Container maxWidth="xs">
        <List dense className={classes.root}>
          {loading ? (
            <Progress height="141px" />
          ) : (
            info &&
            info.map((value, index) => {
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
            })
          )}
        </List>
      </Container>
    </>
  );
}
