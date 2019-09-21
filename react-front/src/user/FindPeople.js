import React, { Component } from "react";
import { findPeople, follow } from "./apiUser";
import Avatar from "../images/avatar.png";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

class FindPeople extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      error: "",
      open: false
    };
  }

  componentDidMount() {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    findPeople(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  clickFollow = (user, i) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    follow(userId, token, user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        let toFollow = this.state.users;
        toFollow.splicee(i, 1);
        this.setState({
          users: toFollow,
          open: true,
          followMessage: `${user.name} 팔로우 했습니다.`
        });
      }
    });
  };
  renderUsers = users => {
    return (
      <div>
        {users.map((user, i) => (
          <div key={i}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <Link to={`/user/${user._id}`}>
              <img
                src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                onError={i => (i.target.src = `${Avatar}`)}
                alt={user.name}
              />
            </Link>
            <button onCick={() => this.clickFollow(user, i)}>Follow</button>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { users, open, followMessage } = this.state;
    return (
      <div>
        <h2>유저찾기</h2>
        {open && (
          <div>
            <p>{followMessage}</p>
          </div>
        )}
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default FindPeople;
