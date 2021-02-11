import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Person, DoneAll, Update, ShoppingCart } from "@material-ui/icons";
import Card from "./Card";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "20px",
  },
  icon: {
    color: "#555",
    fontSize: "25px",
    marginBottom: "-3px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
}));

export default function CardList() {
  const classes = useStyles();
  const cardData = [
    {
      title: "Members",
      icon: <Person className={classes.icon} />,
      value: "102 GYM Members",
      link: "/members",
      linkText: "View member",
    },
    {
      title: "Subscribed",
      icon: <DoneAll className={classes.icon} />,
      value: "92 Paying Members",
      link: "/members/?subscribed=true",
      linkText: "View member",
    },
    {
      title: "Memberships",
      icon: <ShoppingCart className={classes.icon} />,
      value: "3 Options",
      link: "/memberships",
      linkText: "View All",
    },
    {
      title: "Renew",
      icon: <Update className={classes.icon} />,
      value: "5 ending soon",
      link: "/members/?ending_soon=true",
      linkText: "View All",
    },
  ];
  return (
    <Grid container spacing={2} className={classes.root}>
      {cardData.map((data, index) => (
        <Grid item xs={6} sm={6} md={3} key={index}>
          <Card {...data} />
        </Grid>
      ))}
    </Grid>
  );
}
