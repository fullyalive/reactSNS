import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";
import { Redirect } from "react-router-dom";
import Loading from "../core/Loading";
import Avatar from "../images/avatar.png";

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      photo: "",
      error: "",
      user: {},
      fileSize: 0,
      loading: false,
      redirectToProfile: false
    };
  }

  componentDidMount() {
    this.postData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (title.length === 0) {
      this.setState({ error: "제목을 입력해주세요", loading: false });
      return false;
    }
    if (body.length === 0) {
      this.setState({ error: "본문을 입력해주세요", loading: false });
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
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.postData).then(data => {
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

  newPostForm = (title, body) => (
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
      <button onClick={this.handleSubmit}>글쓰기</button>
    </form>
  );

  render() {
    const {
      title,
      body,
      photo,
      user,
      loading,
      error,
      redirectToProfile
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${user._id}`} />;
    }
    // const photoUrl = id
    //   ? `${
    //       process.env.REACT_APP_API_URL
    //     }/user/photo/${id}?${new Date().getTime()}`
    //   : Avatar;

    return (
      <div>
        {loading ? <Loading /> : ""}
        <h2>프로필수정</h2>
        <div style={{ display: error ? "" : "none" }}>{error}</div>
        {this.newPostForm(title, body)}
      </div>
    );
  }
}

export default NewPost;
