import { Grid } from "@material-ui/core";
import Card from "./Card";
import AddCard from "./AddCard";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom:"20px"
  },
}));

export default function CardList(props) {
  const classes = useStyles();

  const data = [
    { id: 1, title: "Morning" },
    { id: 2, title: "Noon" },
    { id: 3, title: "Evening" },
  ];

  return (
    <Grid container spacing={1} className={classes.root}>
      {data.map((i) => (
        <Grid key={i.id} item xs={12} sm={6} md={4}>
          <Card {...i} />
        </Grid>
      ))}
      <Grid item xs={12} sm={6} md={4}>
        <AddCard />
      </Grid>
    </Grid>
  );
}
