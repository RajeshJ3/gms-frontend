import { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

class LoginNotice extends Component {
  rootStyle = {
    alignItems: "center",
    color: "#505050",
    height: "50vh",
  };

  render() {
    return (
      <div style={this.rootStyle}>
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
          }}
        >
          <div>
            <CircularProgress />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginNotice;
