import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import avatar from "../images/avatar.png";

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
    const { redirectToSignin, user } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;
    return (
      <div>
        <h2>내정보</h2>
        <div>
          <img src={avatar} alt={user.name} />
          <p>{isAuthenticated().user.name}</p>
          <p>{isAuthenticated().user.email}</p>
          <p>{`가입일 ${new Date(this.state.user.created).toDateString()}`}</p>
        </div>
        <div>
          {isAuthenticated().user && isAuthenticated().user._id === user._id && (
            <div>
              <Link to={`/user/edit/${this.state.user_id}`}>프로필수정</Link>
              <button>회원탈퇴</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
