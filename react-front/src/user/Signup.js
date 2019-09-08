import React, { Component } from "react";
import { signup } from "../auth";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password
    };
    signup(user).then(data => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          name: "",
          email: "",
          password: "",
          error: "",
          open: true
        });
    });
  };

  signupForm = (name, email, password, open) => {
    return (
      <form style={{ display: open ? "none" : "" }}>
        <div>
          <label>이름</label>
          <input
            onChange={this.handleChange("name")}
            type="text"
            value={name}
          ></input>
        </div>
        <div>
          <label>이메일</label>
          <input
            onChange={this.handleChange("email")}
            type="email"
            value={email}
          ></input>
        </div>
        <div>
          <label>비밀번호</label>
          <input
            onChange={this.handleChange("password")}
            type="password"
            value={password}
          ></input>
        </div>
        <button onClick={this.handleSubmit}>가입하기</button>
      </form>
    );
  };

  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div>
        <h2>회원가입</h2>
        <div style={{ display: error ? "" : "none" }}>{error}</div>
        <div style={{ display: open ? "" : "none" }}>
          회원가입 성공! 로그인해주세요.
        </div>
        {/* 회원가입 후 아이디 표시 되도록 */}
        {/* <div style={{ display: open ? "" : "none" }}>ID: </div>  */}

        {this.signupForm(name, email, password, open)}
      </div>
    );
  }
}

export default Signup;
