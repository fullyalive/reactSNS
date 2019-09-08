import React, { Component } from "react";
import { isAuthenticated } from "../auth";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false
    };
  }

  componentDidMount() {
    console.log("user id from route params: ", this.props.match.params.userId);
  }

  render() {
    return (
      <div>
        <h2>내정보</h2>
        <p>{isAuthenticated().user.name}</p>
        <p>{isAuthenticated().user.email}</p>
      </div>
    );
  }
}

export default Profile;
