import React, { Component } from "react";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";

class Comment extends Component {
  state = {
    text: "",
    error: "",
    redirectToSignin: false
  };

  isValid = () => {
    const { text } = this.state;
    if (text.length === 0) {
      this.setState({ error: "댓글을 입력해주세요" });
      return false;
    }
    return true;
  };

  handleChange = event => {
    this.setState({
      text: event.target.value,
      error: ""
    });
  };

  loginConfirmed = () => {
    let answer = window.confirm("로그인이 필요합니다. 로그인하시겠습니까?");
    if (answer) {
      this.setState({ redirectToSignin: true });
      return false;
    }
  };

  addComment = e => {
    e.preventDefault();

    if (!isAuthenticated()) {
      this.setState({ error: "로그인이 필요합니다." });
      this.loginConfirmed();
      return false;
    }

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      const postId = this.props.postId;

      comment(userId, token, postId, {
        text: this.state.text
      }).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({ text: "" });
          // dispatch fresh list of comments to parent ( SinglePost )
          this.props.updateComments(data.comments);
        }
      });
    }
  };

  deleteComment = comment => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;

    uncomment(userId, token, postId, comment).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.props.updateComments(data.comments);
      }
    });
  };

  deleteConfirmed = comment => {
    let answer = window.confirm("정말로 삭제하시겠습니까?");
    if (answer) {
      this.deleteComment(comment);
    }
  };

  render() {
    const { comments } = this.props;
    const { error, redirectToSignin } = this.state;
    if (redirectToSignin) {
      return <Redirect to={"/signin"} />;
    }
    return (
      <div>
        <h2>댓글 {comments.length}</h2>
        <form
          onSubmit={this.addComment}
          style={{
            display:
              isAuthenticated() && isAuthenticated().user._id ? "" : "none"
          }}
        >
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.text}
            placeholder="댓글을 입력하세요"
          />
          <button onclick={this.loginConfirmed}> 등록 </button>
        </form>
        <div style={{ display: error ? "" : "none" }}> {error} </div>
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
            <span>
              {isAuthenticated().user &&
                isAuthenticated().user._id === comment.postedBy._id && (
                  <>
                    <span onClick={() => this.deleteConfirmed(comment)}>
                      삭제
                    </span>
                  </>
                )}
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default Comment;
