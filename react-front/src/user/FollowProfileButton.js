import React, { Component } from "react";

class FollowProfileButton extends Component {
  render() {
    return (
      <div>
        {!this.props.following ? (
          <button>Follow</button>
        ) : (
          <button>Unfollow</button>
        )}
      </div>
    );
  }
}
export default FollowProfileButton;
