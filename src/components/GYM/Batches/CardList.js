import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Card from "./Card";
import AddCard from "./AddCard";
import axios from "axios";
import { DOMAIN, getToken } from "../../../store/utility";
import Progress from "../../errors/Progress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom:"20px"
  },
}));

export default function CardList(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${DOMAIN}/gyms/batches/`,
      headers: { Authorization: `Token ${getToken}` },
    })
      .then((res) => {
        let data = [];
        data = res.data.output.map((i) => ({
          id: i.id,
          title: i.title,
        }));
        setLoading(false);
        setData(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <Grid container spacing={1} className={classes.root}>
      {loading ? (
        <Progress height="100px" top="50%" />
      ) : (
        data.map((membership) => (
          <Grid key={membership.id} item xs={12} sm={6} md={4}>
            <Card {...membership} />
          </Grid>
        ))
      )}
      {loading ? null : (
        <Grid item xs={12} sm={6} md={4}>
          <AddCard />
        </Grid>
      )}
    </Grid>
  );
}
