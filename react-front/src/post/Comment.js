import React, { Component } from "react";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

class Comment extends Component {
  state = {
    text: ""
  };

  handleChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  addComment = e => {
    e.preventDefault();
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;

    comment(userId, token, postId, { text: this.state.text }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ text: "" });
        // dispatch fresh list of comments to parent ( SinglePost )
        this.props.updateComments(data.comments);
      }
    });
  };

  render() {
    return (
      <div>
        <h2>댓글</h2>
        <form onSubmit={this.addComment}>
          <input type="text" onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

export default Comment;
