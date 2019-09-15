import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import Avatar from "../images/avatar.png";
import DeleteUser from "./DeleteUser";

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

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, user } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;
    return (
      <div>
        <h2>내정보</h2>
        <div>
          <img src={Avatar} alt={user.name} />
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{`가입일 ${new Date(this.state.user.created).toDateString()}`}</p>
        </div>
        <div>
          {isAuthenticated().user && isAuthenticated().user._id === user._id && (
            <div>
              <Link to={`/user/edit/${user._id}`}>프로필수정</Link>
              <DeleteUser userId={user._id} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
