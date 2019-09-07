import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      users: []
    };
  }

  getUsers() {
    axios("https://api.randomuser.me/?nat=US&results=5").then(response =>
      this.setState({
        users: response.data.results
      })
    );
  }

  componentWillMount() {
    this.getUsers();
  } // Component가 mount되기 전에 API를 부르고 싶을 때 사용

  render() {
    return (
      <div className="App">
        {this.state.users.map(user => (
          <div>
            {user.name.first} {user.name.last}
            <hr />
            <ul>
              <li>{user.email}</li>
              <li>{user.cell}</li>
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default App;