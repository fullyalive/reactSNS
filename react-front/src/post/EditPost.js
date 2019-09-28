import React, { Component } from "react";
import { singlePost, update } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import Loading from "../core/Loading"
// import DefaultPost from "../images/defaultPost.png";

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

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (title.length === 0) {
      this.setState({ error: "제목을 입력해주세요.", loading: false });
      return false;
    }
    if (body.length === 0) {
      this.setState({
        error: "본문을 작성해주세요.",
        loading: false
      });
      return false;
    }
    if (fileSize > 1000000) {
      this.setState({
        error: "1MB 이하의 이미지만 업로드 가능합니다.",
        loading: false
      });
      return false;
    }
    // 중복 닉네임 방지
    return true;
  };

  handleChange = title => event => {
    this.setState({ error: "" });
    const value = title === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = title === "photo" ? event.target.files[0].size : 0;
    this.postData.set(title, value);
    this.setState({ [title]: value, fileSize });
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
    const { id, title, body, error, loading, redirectToProfile } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
    }

    return (
      <div>
        {loading ? <Loading /> : ""}
        <div style={{ display: error ? "" : "none" }}>{error}</div>
        {this.editPostForm(title, body)}
        <img
          src={`${
            process.env.REACT_APP_API_URL
          }/post/photo/${id}?${new Date().getTime()}`}
          // onError={i => {
          //   i.target.src = `${DefaultPost}`;
          // }}
          alt={title}
        />
      </div>
    );
  }
}

export default EditPost;
