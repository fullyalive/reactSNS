import React, { Component } from "react";
import { follow, unfollow } from "./apiUser";

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow);
  };
  unfollowClick = () => {
    this.props.onButtonClick(unfollow);
  };

  render() {
    return (
      <div>
        {!this.props.following ? (
          <button onClick={this.followClick}>Follow</button>
        ) : (
          <button onClick={this.unfollowClick}>Unfollow</button>
        )}
      </div>
    );
  }
}
export default FollowProfileButton;
