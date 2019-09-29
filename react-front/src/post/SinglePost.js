import React, { Component } from "react";
import { singlePost, remove, like, unlike } from "./apiPost";
import Loading from "../core/Loading";
// import DefaultPost from "../images/defaultPost.png";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

class SinglePost extends Component {
  state = {
    post: "",
    deleted: false,
    redirectToHome: false,
    like: false,
    likes: 0
  };

  checkLike = likes => {
    const userId = isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    singlePost(postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          post: data,
          likes: data.likes.length,
          like: this.checkLike(data.likes)
        });
      }
    });
  };

  likeToggle = () => {
    let callApi = this.state.like ? unlike : like;
    const userId = isAuthenticated().user._id;
    const postId = this.state.post._id;
    const token = isAuthenticated().token;

    callApi(userId, token, postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length
        });
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
    const { like, likes } = this.state;

    return (
      <div>
        <h2>{post.title}</h2>
        <img
          src={`${process.env.REACT_API_URL}/post/photo/${post._id}`}
          alt={post.title}
          // onError={i => i.target.src = `${DefaultPost}`}
        />
        <div onClick={this.likeToggle}>
          {likes === 1 ? `${likes} Like` : `${likes} Likes`}
        </div>
        <p>{post.body}</p>
        <br />
        <p>
          by <Link to={`${posterId}`}>{posterName}</Link>
        </p>
        on {new Date(post.created).toDateString()}
        {isAuthenticated().user &&
          isAuthenticated().user._id === post.postedBy._id && (
            <div>
              <Link to={`/post/edit/${post._id}`}>수정</Link>
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
