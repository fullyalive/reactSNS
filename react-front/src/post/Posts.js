import React, { Component } from "react";
import { list } from "./apiPost";
import Loading from "../core/Loading";
// import DefaultPost from "../images/defaultPost.png";
import { Link } from "react-router-dom";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  }

  renderPosts = posts => {
    return (
      <div>
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : " Unknown";

          return (
            <div key={i}>
              <p>{post.title}</p>
              <p>{post.body.substring(0, 50)}...</p>
              <img
                src={`${process.env.REACT_API_URL}/post/photo/${post._id}`}
                alt={post.title}
                // onError={i => i.target.src = `${DefaultPost}`}
              />
              <br />
              <p>
                by <Link to={posterId}>{posterName}</Link>
              </p>
              <Link to={`/post/${post._id}`}>더보기</Link>
              on {new Date(post.created).toDateString()}
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts } = this.state;
    return (
      <div>
        {!posts.length ? <Loading /> : ""}
        <h2>최근 게시물</h2>
        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default Posts;
