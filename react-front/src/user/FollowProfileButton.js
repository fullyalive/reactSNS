import React, { Component } from "react";
import { follow } from "./apiUser";

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow)
  }
  render() {
    return (
      <div>
        {!this.props.following ? (
          <button onClick={this.followClick}>Follow</button>
        ) : (
          <button>Unfollow</button>
        )}
      </div>
    );
  }
}
export default FollowProfileButton;
