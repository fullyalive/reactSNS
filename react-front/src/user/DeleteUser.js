import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";
import { remove } from "./apiUser";

class DeleteUser extends Component {
  state = {
    redirect: false
  }; // redirect를 하기 위해서 state관리가 필요
  deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = this.props.userId;
    remove(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        // signout user
        signout(() => console.log("탈퇴 완료"));
        // redirect
        this.setState({ redirect: true });
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm("정말 탈퇴하시겠습니까?");
    if (answer) {
      this.deleteAccount();
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return <button onClick={this.deleteConfirmed}>회원탈퇴</button>;
  }
}

export default DeleteUser;
