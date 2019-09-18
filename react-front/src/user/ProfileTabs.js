import React, { Component } from "react";
import { Link } from "react-router-dom";
import Avatar from "../images/avatar.png";

class ProfileTabs extends Component {
  render() {
    const { following, followers } = this.props;
    return (
      <div>
        <div>
          following
          {following.map((person, i) => {
            return (
              <div key={i}>
                <div>
                  <Link to={`/user/${person._id}`}>
                    <img
                      onError={i => {
                        i.target.src = `${Avatar}`;
                      }}
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                      alt={person.name}
                    />
                    {person.name}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          followers
          {followers.map((person, i) => {
            return (
              <div key={i}>
                <div>
                  <Link to={`/user/${person._id}`}>
                    <img
                      onError={i => {
                        i.target.src = `${Avatar}`;
                      }}
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                      alt={person.name}
                    />
                    {person.name}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div>
            posts
        </div>
      </div>
    );
  }
}

export default ProfileTabs;
