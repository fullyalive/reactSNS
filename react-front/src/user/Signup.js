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
  render() {
    return (
      <div>
        <h2>회원가입</h2>
        <form>
          <div>
            <label>이름</label>
            <input type="text"></input>
          </div>
          <div>
            <label>이메일</label>
            <input type="email"></input>
          </div>
          <div>
            <label>비밀번호</label>
            <input type="password"></input>
          </div>
          <button>가입하기</button>
        </form>
      </div>
    );
  }
}

export default Signup;
