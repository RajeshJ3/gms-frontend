import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { Container, Typography, Divider } from "@material-ui/core";
import Title from "../Members/Title";
import axios from "axios";
import { DOMAIN, getToken } from "../../store/utility";
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
}));

export default function MemberInfo(props) {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${DOMAIN}/members/`,
      headers: { Authorization: `Token ${getToken}` },
      params: { id: props.match.params.id },
    })
      .then((res) => {
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
                key: "Mobile",
                value: res.data.output[0].phone ? res.data.output[0].phone : "-",
              },
              {
                key: "Email",
                value: res.data.output[0].email,
              },
              {
                key: "Batch",
                value: res.data.output[0].batch_title
                  ? res.data.output[0].batch_title
                  : "-",
              },
              {
                key: "Joined Date",
                value: res.data.output[0].joined_date,
              },
            ],
          ];
        }
        setInfo(temp);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [props.match.params.id]);

  return (
    <>
      <Title title={loading ? "Loading.." : data.name} avatarUrl={data.image ? data.image : ""} edit={true} gym={false} {...data} />
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
            })
          )}
        </List>
      </Container>
    </>
  );
}
