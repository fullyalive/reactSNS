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

  componentWillMount() {
    axios("https://api.randomuser.me/?nat=US&results=5").then(response =>
      this.setState({
        users: response.data.results
      })
    );
  } // Component가 mount되기 전에 API를 부르고 싶을 때 사용

  render() {
    return <div className="App">Hello, fullyalive</div>;
  }
}

export default App;
