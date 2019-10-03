import React, { Component } from "react";
import { resetPassword } from "../auth";
import { Link } from "react-router-dom";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      message: "",
      error: ""
    };
  }

  resetPassword = e => {
    e.preventDefault();
    this.setState({ message: "", error: "" });

    resetPassword({
      newPassword: this.state.newPassword,
      resetPasswordLink: this.props.match.params.resetPasswordToken
    }).then(data => {
      if (data.error) {
        console.log(data.error);
        this.setState({ error: data.error });
      } else {
        console.log(data.message);
        this.setState({ message: data.message, newPassword: "" });
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.message && <div>{this.state.message}</div>}
        {this.state.error && <div>{this.state.error}</div>}

        <form
          style={{
            display:
              this.state.message ===
              "비밀번호가 변경되었습니다. 새로운 비밀번호로 로그인해주세요."
                ? "none"
                : ""
          }}
        >
          <input
            type="password"
            placeholder="새로운 비밀번호를 입력하세요."
            value={this.state.newPassword}
            name="newPassword"
            onChange={e =>
              this.setState({
                newPassword: e.target.value,
                message: "",
                error: ""
              })
            }
            autoFocus
          />
          <button onClick={this.resetPassword}>변경</button>
        </form>
        <Link
          style={{
            display:
              this.state.message ===
              "비밀번호가 변경되었습니다. 새로운 비밀번호로 로그인해주세요."
                ? ""
                : "none"
          }}
          to={"/signin"}
        >
          로그인
        </Link>
      </div>
    );
  }
}

export default ResetPassword;
