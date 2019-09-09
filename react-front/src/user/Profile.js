import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${isAuthenticated().token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          this.setState({ redirectToSignin: true });
        } else {
          this.setState({ user: data });
        }
      });
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
