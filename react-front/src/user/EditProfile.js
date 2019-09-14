import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read, update } from "./apiUser";
import { Redirect } from "react-router-dom";
import Loading from "../core/Loading";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      password: "",
      error: "",
      fileSize: 0,
      loading: false,
      redirectToProfile: false
    };
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          error: ""
        });
      }
    });
  };

  componentDidMount() {
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
    const { name, password, fileSize } = this.state;
    if (name.length === 0) {
      this.setState({ error: "닉네임을 입력해주세요" });
      return false;
    }
    if (password.length >= 1 && password.elgnth <= 5) {
      this.setState({ error: "비밀번호는 6글자 이상이어야 합니다." });
      return false;
    }
    if (fileSize > 1000000) {
      this.setState({ error: "1MB 이하의 이미지만 업로드 가능합니다." });
      return false;
    }
    // 중복 닉네임 방지
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    if (this.isValid()) {
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;
      update(userId, token, this.userData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else
          this.setState({
            redirectToProfile: true
          });
      });
    }
  };

  editForm = (name, password, photo) => (
    <form>
      <div>
        <label>프로필사진</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          value={photo}
        />
      </div>
      <div>
        <label>닉네임</label>
        <input onChange={this.handleChange("name")} type="text" value={name} />
      </div>
      <div>
        <label>비밀번호</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          value={password}
        />
      </div>
      <button onClick={this.handleSubmit}>수정</button>
    </form>
  );

  render() {
    const {
      id,
      name,
      password,
      error,
      loading,
      redirectToProfile
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    return (
      <div>
        {loading ? <Loading /> : ""}
        <h2>프로필수정</h2>
        <div style={{ display: error ? "" : "none" }}>{error}</div>
        {this.editForm(name, password)}
      </div>
    );
  }
}

export default EditProfile;
