import React, { Component } from "react";
import { singlePost, update } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      body: "",
      error: "",
      loading: false,
      redirectToProfile: false
    };
  }

  init = postId => {
    singlePost(postId).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          title: data.title,
          body: data.body,
          error: ""
        });
      }
    });
  };

  componentDidMount() {
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    this.init(postId);
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const postId = this.state.id;
      const token = isAuthenticated().token;

      update(postId, token, this.postData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            title: "",
            body: "",
            photo: "",
            redirectToProfile: true
          });
        }
      });
    }
  };

  editPostForm = (title, body) => (
    <form>
      <div>
        <label>제목</label>
        <input
          onChange={this.handleChange("title")}
          type="text"
          value={title}
        />
      </div>
      <div>
        <label>내용</label>
        <textarea
          onChange={this.handleChange("body")}
          type="text"
          value={body}
        />
      </div>
      <div>
        <label>사진</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
        />
      </div>
      <button onClick={this.handleSubmit}>수정</button>
    </form>
  );

  render() {
    const { title, body, redirectToProfile } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
    }

    return (
      <div>
        {JSON.stringify(this.state)}
        {this.editPostForm(title, body)}
      </div>
    );
  }
}

export default EditPost;
