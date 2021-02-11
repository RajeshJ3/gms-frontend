import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import {
  House,
  ChevronRight,
  ChevronLeft,
  Menu,
  Group,
  FitnessCenter,
  ExitToApp,
  Settings,
  Fingerprint,
  PersonAdd,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "rgb(245, 245, 245)",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Navigation(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            style={{ cursor: "pointer", userSelect: "none" }}
            component={Link}
            to="/dashboard"
          >
            GMS
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/dashboard" onClick={handleDrawerClose}>
            <ListItemIcon>
              <House />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/memberships" onClick={handleDrawerClose}>
            <ListItemIcon>
              <FitnessCenter />
            </ListItemIcon>
            <ListItemText primary="GYM" />
          </ListItem>
          <ListItem button component={Link} to="/members" onClick={handleDrawerClose}>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Members" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {props.isAuthenticated ? (
            <>
              <ListItem button component={Link} to="/settings" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings"/>
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/login" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <Fingerprint />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button component={Link} to="/login" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
}
