import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffd11a",
    zIndex: "100",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
  },
  description: {
    lineHeight: 1.1,
  },
  icon: {
    position: "absolute",
    top: "15px",
    color: "#444",
    cursor: "pointer",
    right: "15px",
  },
}));

export default function Features() {
  const classes = useStyles();

  return (
    <section>
      <Container className={classes.root} maxWidth="xl">
        <Box pt={2} pb={1.5} textAlign="center">
          <Typography variant="h6" component="h2" gutterBottom={true}>
            Get 2 Months <b>FREE</b>!
          </Typography>
          <Typography
            variant="subtitle"
            color="textSecondary"
            className={classes.description}
          >
            First 100 GYMs will get 2 months of free premium.
            {" "}<b>
              <u>
                <a href="/signup">Register Now</a>
              </u>
            </b>,{" "}
            92 already joined.
          </Typography>
        </Box>
      </Container>
    </section>
  );
}
