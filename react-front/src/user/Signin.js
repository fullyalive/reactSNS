import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Loading from "../core/Loading";
import { signin, authenticate } from "../auth";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    signin(user).then(data => {
      if (data.error) this.setState({ error: data.error, loading: false });
      else {
        // authenticate
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
        // redirect
      }
    });
  };

  signinForm = (email, password) => {
    return (
      <form>
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
        <button onClick={this.handleSubmit}>로그인</button>
      </form>
    );
  };

  render() {
    const { email, password, error, redirectToReferer, loading } = this.state;

    if (redirectToReferer) {
      return <Redirect to="/" />; // from react-router-dom
    }
    return (
      <div>
        <h2>로그인</h2>
        <div style={{ display: error ? "" : "none" }}>{error}</div>
        {loading ? <Loading /> : ""}
        {this.signinForm(email, password)}
      </div>
    );
  }
}

export default Signin;
