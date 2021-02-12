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
import axios from "axios";
import { DOMAIN, getToken } from "../../store/utility";
import Progress from "../errors/Progress";

function createData(id, image, name, amount, batch, valid_from, valid_till) {
  return { id, image, name, amount, batch, valid_from, valid_till };
}

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      width: "93vw",
      overflowX: "scroll !important",
    },
  },
  container: {
    maxHeight: 600,
  },
  avatarContainer: {
    width: "0.1px",
  },
}));

export default function StickyHeadTable(props) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  const [columns, setColumns] = useState([
    {
      id: "amount",
      label: "Amount",
      format: (value) => value.toLocaleString("en-US"),
      padding: "5px 5px 5px 10px",
    },
    {
      id: "batch",
      label: "Batch",
      padding: "5px 5px 5px 10px",
    },
    {
      id: "valid_from",
      label: "From",
      align: "right",
      padding: "5px 10px 5px 5px",
      minWidth: "100px",
    },
    {
      id: "valid_till",
      label: "Till",
      align: "right",
      padding: "5px 10px 5px 0px",
      minWidth: "100px",
    },
  ]);
  const [columnsEdited, setColumnsEdited] = useState(false);
  useEffect(() => {
    if (props.type !== "one-member" && !columnsEdited) {
      let more = [
        {
          id: "image",
          label: "",
          align: "right",
          padding: "5px 5px 5px 0px",
          component: Link,
          link: "/members",
        },
        {
          id: "name",
          label: "Name",
          padding: "5px 5px 5px 0px",
          fontWeight: "bold",
          minWidth: "120px",
          component: Link,
          link: "/members",
        },
      ];
      setColumns([...more, ...columns]);
      setColumnsEdited(true);
    }
  }, [columns, columnsEdited, props.type]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${DOMAIN}/members/subscription/`,
      params: {member: props.memberId},
      headers: { Authorization: `Token ${getToken}` },
    })
      .then((res) => {
        let data = [];
        data = res.data.output.map((i) =>
          createData(
            i.member,
            i.member_image,
            i.member_name,
            i.amount,
            i.batch_title,
            i.valid_from,
            i.valid_till
          )
        );
        setLoading(false);
        setRows(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [props.memberId]);

  const classes = useStyles();

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
                          <Link to={column.link ? `${column.link}/${row['id']}` : "#"}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
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
                            to={column.link ? `${column.link}/${row['id']}` : "#"}
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
