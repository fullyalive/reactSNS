import React, { Component } from "react";

class DeleteUser extends Component {
  deleteAccount = () => {
    console.log("다음에 다시 만나요");
  };

  deleteConfirmed = () => {
    let answer = window.confirm("정말 탈퇴하시겠습니까?");
    if (answer) {
      this.deleteAccount();
    }
  };
  
  render() {
    return <button onClick={this.deleteConfirmed}>회원탈퇴</button>;
  }
}

export default DeleteUser;
