import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useTheme, useMediaQuery } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { Cancel, CheckCircle } from "@material-ui/icons";
import axios from "axios";
import { DOMAIN, getToken } from "../../store/utility";
import Progress from "../errors/Progress";

function createData(image, name, batch, activeSubscription, joined_date) {
  return { image, name, batch, activeSubscription, joined_date };
}

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      width: "94vw",
      overflowX: "scroll !important",
    },
  },
  container: {
    maxHeight: 800,
  },
  avatarContainer: {
    width: "0.1px",
  },
  check: {
    color: "green",
  },
  cancle: {
    color: "red",
  },
}));

export default function StickyHeadTable(props) {
  const theme = useTheme();
  const columns = [
    {
      id: "image",
      label: "",
      align: "right",
      padding: "5px 5px 5px 0px",
      component: Link,
      link: "/members/9",
    },
    {
      id: "name",
      label: "Name",
      padding: "5px 5px 5px 0px",
      fontWeight: "bold",
      minWidth: "120px",
      component: Link,
      link: "/members/9",
    },
    {
      id: "batch",
      label: "Batch",
      padding: "5px 5px 5px 10px",
    },
    {
      id: "activeSubscription",
      label: "Subscribed",
      align: "right",
      padding: "5px 5px 5px 10px",
    },
    {
      id: "joined_date",
      label: "Joined Date",
      align: "right",
      padding: "5px 10px 5px 0px",
      minWidth: "100px",
    },
  ];

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(null);
  const [endingSoon, setEndingSoon] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setSubscribed(
      new URLSearchParams(props.location.search).get("subscribed") === "true"
        ? true
        : new URLSearchParams(props.location.search).get("subscribed") ===
          "false"
        ? false
        : null
    );
  }, [props.location.search]);

  useEffect(() => {
    setEndingSoon(
      new URLSearchParams(props.location.search).get("ending_soon") === "true"
        ? true
        : new URLSearchParams(props.location.search).get("ending_soon") ===
          "false"
        ? false
        : null
    );
  }, [props.location.search]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${DOMAIN}/members/`,
      headers: { Authorization: `Token ${getToken}` },
    })
      .then((res) => {
        let data = [];
        data = res.data.output
          .filter((i) =>
            typeof subscribed === "boolean" ? i.subscribed === subscribed : i
          )
          .filter((i) =>
            typeof endingSoon === "boolean" ? i.ending_soon === endingSoon : i
          )
          .map((i) =>
            createData(
              i.image,
              i.name,
              i.batch_title,
              i.subscribed,
              i.joined_date
            )
          );
        setLoading(false);
        setRows(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [subscribed, endingSoon]);

  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader size={sm ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ padding: column.padding, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Progress height="100px" top="50%" />
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return column.id !== "image" ? (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            padding: column.padding,
                            minWidth: column.minWidth,
                            fontWeight: column.fontWeight,
                          }}
                        >
                          <Link to={column.link ? column.link : "#"}>
                            {typeof value === "boolean" ? (
                              value ? (
                                <CheckCircle className={classes.check} />
                              ) : (
                                <Cancel className={classes.cancle} />
                              )
                            ) : value ? (
                              value
                            ) : (
                              "-"
                            )}
                          </Link>
                        </TableCell>
                      ) : (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={classes.avatarContainer}
                        >
                          <Avatar
                            component={column.component}
                            to={column.link}
                            alt={row["name"]}
                            src={row[column.id]}
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
