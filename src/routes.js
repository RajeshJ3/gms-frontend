import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUpComponent from "./components/auth/signup";
import SignUpEmailSent from "./components/auth/signup/emailSent";
import SignUpEmailVerify from "./components/auth/signup/verifyEmail";

import LogInComponent from "./components/auth/login";
import ForgotPasswordComponent from "./components/auth/login/forgotPassword";
import ForgotPasswordEmailSentComponent from "./components/auth/login/emailSent";
import ResetPassword from "./components/auth/login/resetPassword";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Member from "./pages/Member";
import Members from "./pages/Members";

// Nav
import Navigation from "./components/Navigation/Index";
import Footer from "./components/Navigation/Footer";

import NotFoundComponent from "./components/errors/NotFound";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "30px 0px 0px 0px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 10px 0px 10px",
    },
  },
}));

function Routes(props) {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Navigation {...props}>
        <Container maxWidth="md" className={classes.container}>
          <Switch>
            <Route
              exact
              path="/signup"
              render={() => <SignUpComponent {...props} />}
            />
            <Route
              exact
              path="/signup/email-sent"
              render={() => <SignUpEmailSent {...props} />}
            />
            <Route
              exact
              path="/signup/verify-email/:key"
              render={(props) => <SignUpEmailVerify {...props} />}
            />

            <Route
              exact
              path="/login"
              render={() => <LogInComponent {...props} />}
            />
            <Route
              exact
              path="/login/forgot-password"
              render={() => <ForgotPasswordComponent {...props} />}
            />
            <Route
              exact
              path="/login/forgot-password/email-sent"
              render={() => <ForgotPasswordEmailSentComponent {...props} />}
            />
            <Route
              exact
              path="/login/reset-password/:uid/:token"
              render={(props) => <ResetPassword {...props} />}
            />

            {/* Pages */}
            <Route
              exact
              path="/"
              render={(props) => <Index {...props} />}
            />
            <Route
              exact
              path="/dashboard"
              render={() => <Dashboard {...props} />}
            />
            <Route
              exact
              path="/members"
              render={(d) => <Members {...d} {...props} />}
            />
            <Route
              exact
              path="/members/:id"
              render={() => <Member {...props} />}
            />

            <Route path="*" component={NotFoundComponent} />
          </Switch>
        </Container>
        <Footer />
      </Navigation>
    </BrowserRouter>
  );
}

export default Routes;
