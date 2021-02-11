import { Component } from "react";
import { Link } from "react-router-dom";

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
            <p style={{ color: "#404040" }}>
              Please{" "}
              <Link
                to="/login"
                style={{
                  color: "blue",
                  borderBottom: "1px solid blue",
                }}
              >
                Login
              </Link>{" "}
              first.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginNotice;
