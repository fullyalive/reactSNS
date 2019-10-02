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
    const { comments } = this.props;
    return (
      <div>
        <h2>댓글 {comments.length}</h2>
        <form onSubmit={this.addComment}>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.text}
            placeholder="댓글을 입력하세요"
          />
          <button> 등록 </button>
        </form>
        {comments.map((comment, i) => (
          <div key={i}>
            <div>
              {comment.text}
              by
              <Link to={`/user/${comment.postedBy._id}`}>
                {comment.postedBy.name}
              </Link>
              on {new Date(comment.created).toDateString()}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Comment;
