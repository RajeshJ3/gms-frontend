import { Grid } from "@material-ui/core";
import Card from "./Card";
import AddCard from "./AddCard";

export default function CardList(props) {
  const data = [
    { id: 1, title: "Bronze", amount: 800 },
    { id: 2, title: "Silver", amount: 1000 },
    { id: 3, title: "Gold", amount: 1500 },
    { id: 4, title: "Diamond", amount: 2000 },
  ];

  return (
    <Grid container spacing={1}>
      {data.map((membership) => (
        <Grid key={membership.id} item xs={12} sm={6} md={4}>
          <Card {...membership} />
        </Grid>
      ))}
      <Grid item xs={12} sm={6} md={4}>
        <AddCard />
      </Grid>
    </Grid>
  );
}
