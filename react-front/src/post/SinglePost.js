import React, { Component } from "react";
import { singlePost, remove } from "./apiPost";
import Loading from "../core/Loading";
// import DefaultPost from "../images/defaultPost.png";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

class SinglePost extends Component {
  state = {
    post: "",
    deleted: false,
    redirectToHome: false
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    singlePost(postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ post: data });
      }
    });
  };

  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;
    remove(postId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ redirectToHome: true });
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm("정말로 삭제하시겠습니까?");
    if (answer) {
      this.deletePost();
    }
  };

  renderPost = post => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : " Unknown";

    return (
      <div>
        <h2>{post.title}</h2>
        <img
          src={`${process.env.REACT_API_URL}/post/photo/${post._id}`}
          alt={post.title}
          // onError={i => i.target.src = `${DefaultPost}`}
        />
        <p>{post.body}</p>
        <br />
        <p>
          by <Link to={`${posterId}`}>{posterName}</Link>
        </p>
        on {new Date(post.created).toDateString()}
        {isAuthenticated().user &&
          isAuthenticated().user._id === post.postedBy._id && (
            <div>
              <Link to={`/post/edit/${post._id}`} >수정</Link>
              <button onClick={this.deleteConfirmed}>삭제</button>
            </div>
          )}
        <Link to={`/`}>목록</Link>
      </div>
    );
  };

  render() {
    const { post, redirectToHome } = this.state;
    if (redirectToHome) {
      return <Redirect to={"/"} />;
    }
    return <div>{!post ? <Loading /> : this.renderPost(post)}</div>;
  }
}

export default SinglePost;
