import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import Avatar from "../images/avatar.png";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      following: false
    };
  }

  // check follow
  checkFollow = user => {
    const jwt = isAuthenticated();
    const match = user.followers.find(follower => {
      // one id has many other ids (followers) and vice versa
      return follower._id === jwt.user._id;
    });
    return match;
  };

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        let following = this.checkFollow(data);
        this.setState({ user: data, following });
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
    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}}`
      : Avatar;
    return (
      <div>
        <h2>내정보</h2>
        <div>
          <img
            src={photoUrl}
            onError={i => (i.target.src = `${Avatar}`)}
            alt={user.name}
          />
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.bio}</p>
          <p>{`가입일 ${new Date(this.state.user.created).toDateString()}`}</p>
        </div>
        <div>
          {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
            <div>
              <Link to={`/user/edit/${user._id}`}>프로필수정</Link>
              <DeleteUser userId={user._id} />
            </div>
          ) : (
            <FollowProfileButton following={this.state.following} />
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
