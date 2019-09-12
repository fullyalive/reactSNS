import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read } from "./apiUser";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      password: ""
    };
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email
        });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  handleChange = name => event => {
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
  };

  editForm = (name, email, password) => (
    <form>
      <div>
        <label>Name</label>
        <input onChange={this.handleChange("name")} type="text" value={name} />
      </div>
      <div>
        <label>이메일</label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          value={email}
        />
      </div>
      <div>
        <label>비밀번호</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          value={password}
        />
      </div>
      <button onClick={this.handleSubmit}>수정</button>
    </form>
  );

  render() {
    const { name, email, password } = this.state;
    return (
      <div>
        <h2>프로필수정</h2>
        {this.editForm(name, email, password)}
      </div>
    );
  }
}

export default EditProfile;
