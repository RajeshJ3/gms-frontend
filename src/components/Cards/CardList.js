import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Person, DoneAll, Update, ShoppingCart } from "@material-ui/icons";
import Card from "./Card";
import axios from "axios";
import { DOMAIN, getToken, getUser } from "../../store/utility";
import Progress from "../errors/Progress";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "20px",
    width: "100%",
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
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${DOMAIN}/gyms/dashboard/`,
          params: { id: getUser.owner_profile[0].gym },
          headers: { Authorization: `Token ${getToken}` },
        });
        setCardData([
          {
            title: "Members",
            icon: <Person className={classes.icon} />,
            value: `${response.data.output.memberships} GYM Members`,
            link: "/members",
            linkText: "View member",
          },
          {
            title: "Subscribed",
            icon: <DoneAll className={classes.icon} />,
            value: `${response.data.output.needs_renewal} Paying Members`,
            link: "/members/?subscribed=true",
            linkText: "View member",
          },
          {
            title: "Memberships",
            icon: <ShoppingCart className={classes.icon} />,
            value: `${response.data.output.subscribed} Options`,
            link: "/memberships",
            linkText: "View All",
          },
          {
            title: "Renew",
            icon: <Update className={classes.icon} />,
            value: `${response.data.output.total_members} ending soon`,
            link: "/members/?ending_soon=true",
            linkText: "View All",
          },
        ]);
        setLoading(false);
      } catch (err) {
        console.log(err.request);
      }
    })();
  }, [classes.icon]);

  return (
    <Grid container spacing={1} className={classes.root}>
      {loading ? (
        <Progress height="163px" />
      ) : (
        cardData.map((data, index) => (
          <Grid item xs={6} sm={6} md={3} key={index}>
            <Card {...data} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
