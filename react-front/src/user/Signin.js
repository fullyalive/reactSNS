import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Loading from "../core/Loading";

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

  authenticate(jwt, next) {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt));
      next();
    }
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
    this.signin(user).then(data => {
      if (data.error) this.setState({ error: data.error, loading: false });
      else {
        // authenticate
        this.authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
        // redirect
      }
    });
  };

  signin = user => {
    return fetch("http://localhost:8888/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
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
