import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useTheme, useMediaQuery } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { Cancel, CheckCircle } from "@material-ui/icons";

function createData(image, name, batch, activeSubscription, joined_date) {
  return { image, name, batch, activeSubscription, joined_date };
}

const rows = [
  createData(
    "https://material-ui.com/static/images/avatar/1.jpg",
    "Ankit Brijwasi",
    "morning",
    true,
    "31 Jan 2021"
  ),
  createData(
    "data:image/jpeg;base64,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",
    "Sagar Bisht",
    "evening",
    false,
    "31 Jan 2021"
  ),
  createData(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2xRchTpIB_MdGH4FBYf3ct3X3dFhw-2AD2g&usqp=CAU",
    "Navdeep Kumar Mishra",
    "morning",
    true,
    "31 Jan 2021"
  ),
  createData(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1hUxKgwfvogAj8q-4GIbMwrhH7nrseCN6Uw&usqp=CAU",
    "Vaibhav Joshi",
    "morning",
    true,
    "31 Jan 2021"
  ),
  createData(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb037P1fxBYVVmIT91IJaIxa1XSEEE-N3osA&usqp=CAU",
    "Sagar Joshi",
    "evening",
    true,
    "31 Jan 2021"
  ),
  createData(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhV0JiGogVAkx9gS5H8dvtpMIa4CAng4NVHA&usqp=CAU",
    "Meghraj",
    "noon",
    false,
    "31 Jan 2021"
  ),
  createData(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBDXpJ03vvBEzI9QZ6F-Y44JnKvfh1aXZCZw&usqp=CAU",
    "Rajesh Joshi",
    "morning",
    true,
    "31 Jan 2021"
  ),
  createData(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDdC0awm8cKt-UaiDMqCF3Zp1-sAo_4qDUew&usqp=CAU",
    "Hema Joshi",
    "morning",
    true,
    "31 Jan 2021"
  ),
  createData(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK0cQgNxebbv8d1ve84As0k3u89vJyAhltyw&usqp=CAU",
    "Pooja Joshi",
    "morning",
    false,
    "31 Jan 2021"
  ),
  createData(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxEjHvCTlkVGDw-dYJgL_3ne8BdQyW9AvnpA&usqp=CAU",
    "Harshita Arya",
    "morning",
    false,
    "31 Jan 2021"
  ),
  createData(
    "https://material-ui.com/static/images/avatar/1.jpg",
    "Khushi Arya",
    "morning",
    true,
    "31 Jan 2021"
  ),
  createData(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYE-a2Zh3C3yO1fq1TSUyrBUgVpPK9uPFfrQ&usqp=CAU",
    "Burlin",
    "morning",
    true,
    "31 Jan 2021"
  ),
  createData(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8jcsjwJWIATc07wiZbpltunkVNqbSVu83hA&usqp=CAU",
    "Pinki",
    "morning",
    false,
    "31 Jan 2021"
  ),
  createData(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaSJvaERVofvrFUNz_6WQOU2KtgHw3UV4g3Q&usqp=CAU",
    "Rohit Mishra",
    "morning",
    true,
    "31 Jan 2021"
  ),
  createData(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQch_ktLSp_FoOflauUH2ZqTyuS8eznBcbwhA&usqp=CAU",
    "Sanjay Joshi",
    "morning",
    true,
    "31 Jan 2021"
  ),
];

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
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
                            ) : (
                              value
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
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
