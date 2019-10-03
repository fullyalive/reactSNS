import React, { Component } from "react";
import { forgotPassword } from "../auth";

class ForgotPassword extends Component {
  state = {
    email: "",
    message: "",
    error: ""
  };

  forgotPassword = e => {
    e.preventDefault();
    this.setState({ message: "", error: "" });
    forgotPassword(this.state.email).then(data => {
      if (data.error) {
        console.log(data.error);
        this.setState({ error: data.error });
      } else {
        console.log(data.message);
        this.setState({ message: data.message });
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.message && <div>{this.state.message}</div>}
        {this.state.error && <div>{this.state.error}</div>}
        <div>
          <form>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              value={this.state.email}
              name="email"
              onChange={e =>
                this.setState({
                  email: e.target.value,
                  message: "",
                  error: ""
                })
              }
              autoFocus
            />
            <button onClick={this.forgotPassword}>전송</button>
          </form>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
