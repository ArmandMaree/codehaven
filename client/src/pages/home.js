import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Loading..."
    }
  }

  componentDidMount() {
    document.title = "Home - CodeHaven"
    
    fetch("/api")
      .then((res) => res.json())
      .then((data) => this.setState({ message: data.message }));
  }

  render() {
    return (
      <div className="Home">
        <h1>Welcome to CodeHaven</h1>
      </div>
    );
  }
}

export default Home
