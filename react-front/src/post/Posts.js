import React, { Component } from "react";
import { list } from "./apiPost";
// import Avatar from "../images/avatar.png";
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
        {posts.map((post, i) => (
          <div key={i}>
            <p>{post.title}</p>
            <p>{post.body}</p>
            <Link to={`/post/${post._id}`}>더보기</Link>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { posts } = this.state;
    return (
      <div>
        <h2>최근 게시물</h2>
        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default Posts;
