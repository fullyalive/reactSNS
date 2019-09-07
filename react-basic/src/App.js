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
  }

  getUsers() {
    this.setState({
      loading: true
    }); // data를 불러오기 전 loading 활성화
    axios("https://api.randomuser.me/?nat=US&results=5").then(response =>
      this.setState({
        users: response.data.results,
        loading: false // data를 불러오고 나면 loading 비활성화
      })
    );
  }

  componentWillMount() {
    this.getUsers();
  } // Component가 mount되기 전에 API를 부르고 싶을 때 사용

  render() {
    return (
      <div className="App">
        {!this.state.loading ? (
          this.state.users.map(user => (
            <div>
              {user.name.first} {user.name.last}
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