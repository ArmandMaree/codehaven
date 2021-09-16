import React from "react";
import FeederForm from '../../components/aquarium-manager/feederForm'

class FeederControl extends React.Component {
  componentDidMount() {
    document.title = "Control - Feeders - CodeHaven"
  }

  render() {
    return (
      <div>
        <h1>Control Feeder</h1>
        <br />
        <FeederForm />
      </div>
    );
  }
}

export default FeederControl
