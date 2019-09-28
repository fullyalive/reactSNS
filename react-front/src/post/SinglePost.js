import React, { Component } from "react";
import { singlePost } from "./apiPost";
import Loading from "../core/Loading";
// import DefaultPost from "../images/defaultPost.png";
import { Link } from "react-router-dom";

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
        <p>{post.body}</p>
        <img
          src={`${process.env.REACT_API_URL}/post/photo/${post._id}`}
          alt={post.title}
          // onError={i => i.target.src = `${DefaultPost}`}
        />
        <br />
        <p>
          by <Link to={posterId}>{posterName}</Link>
        </p>
        <Link to={`/`}>목록</Link>
        on {new Date(post.created).toDateString()}
      </div>
    );
  };

  render() {
    const { post } = this.state;
    return (
      <div>
        {!post ? <Loading /> : ""}
        <h2>{post.title}</h2>
        {this.renderPost(post)}
      </div>
    );
  }
}

export default SinglePost;
