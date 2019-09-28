import React, { Component } from "react";
import { singlePost } from "./apiPost";
import Loading from "../core/Loading";
// import DefaultPost from "../images/defaultPost.png";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

class SinglePost extends Component {
  state = {
    post: ""
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

  renderPost = post => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : " Unknown";
    return (
      <div>
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
              <button>수정</button>
              <button>삭제</button>
            </div>
          )}
        <Link to={`/`}>목록</Link>
      </div>
    );
  };

  render() {
    const { post } = this.state;
    return (
      <div>
        {console.log(111, post)}
        {!post ? <Loading /> : ""}
        <h2>{post.title}</h2>
        {this.renderPost(post)}
      </div>
    );
  }
}

export default SinglePost;
