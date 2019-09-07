import React, { Component } from "react";
import axios from "axios";
import Loading from "./Loading";

class App extends Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      users: [],
      loading: false
    };
    // bind
    this.handleSubmit = this.handleSubmit.bind(this); // handleSubmit을 class App과 묶어주는 것
  }

  getUsers() {
    this.setState({
      loading: true
    }); // data를 불러오기 전 loading 활성화
    axios("https://api.randomuser.me/?nat=US&results=5").then(response =>
      this.setState({
        users: [...this.state.users, ...response.data.results],
        loading: false // data를 불러오고 나면 loading 비활성화
      })
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getUsers();
    console.log("more users loaded");
  }

  componentWillMount() {
    this.getUsers();
  } // Component가 mount되기 전에 API를 부르고 싶을 때 사용

  render() {
    const { loading, users } = this.state;
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="load users" />
        </form>
        <div>found users : {users.length}</div>
        {!loading ? (
          users.map(user => (
            <div key={user.id.value}>
              <h3 style={{ color: "blue" }}>
                {user.name.first} {user.name.last}
              </h3>
              <hr />
              <ul>
                <li>{user.email}</li>
                <li>{user.cell}</li>
              </ul>
            </div>
          ))
        ) : (
          <Loading message="Hey It is Loading" />
        )}
      </div>
    );
  }
}

export default App;