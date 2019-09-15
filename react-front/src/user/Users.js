import React, { Component } from "react";
import { list } from "./apiUser";
import Avatar from "../images/avatar.png";
import { Link } from "react-router-dom";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

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
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { users } = this.state;
    return (
      <div>
        <h2>Users</h2>
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default Users;
