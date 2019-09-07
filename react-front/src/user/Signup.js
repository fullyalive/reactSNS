import React, { Component } from "react";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: ""
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <div>
        <h2>회원가입</h2>
        <form>
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
          <button>가입하기</button>
        </form>
      </div>
    );
  }
}

export default Signup;
