import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import { read } from "./apiUser";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false
    };
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  render() {
    const redirectToSignin = this.state.redirectToSignin;
    if (redirectToSignin) return <Redirect to="/signin" />;
    return (
      <div>
        <h2>내정보</h2>
        <p>{isAuthenticated().user.name}</p>
        <p>{isAuthenticated().user.email}</p>
        <p>{`가입일 ${new Date(this.state.user.created).toDateString()}`}</p>
      </div>
    );
  }
}

export default Profile;
