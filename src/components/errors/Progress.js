import { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

class LoginNotice extends Component {
  render() {
    return (
      <div
        style={{
          height: this.props.height ? this.props.height : "50vh",
          width: "100%",
          position: "relative",
          alignItems: "center",
          color: "#505050",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: this.props.top ? this.props.top : "40%",
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
