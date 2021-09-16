import React from "react";
import Table from 'react-bootstrap/Table'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

class FeederStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feederList: []
    }
    this.getFeederList = this.getFeederList.bind(this)
  }

  componentDidMount() {
    document.title = "Feeders - CodeHaven"
    this.tick()
    this.timerID = setInterval(
      () => this.tick(),
      30000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.getFeederList()
      .then(feederList => {
        this.setState({
          feederList: feederList
        })
      })
  }

  getFeederList() {
    const requestOptions = {
      method: 'GET'
    }

    return fetch(`/api/aquarium-manager/feeder-statuses`, requestOptions)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        return response.json()
      })
      .then(data => {
        this.feeders = data

        return this.feeders.map((feeder) => {
          return (
            <tr>
              <td>{feeder.name}</td>
              <td>{feeder.status}</td>
              <td>{feeder.code}</td>
              <td>{feeder.message}</td>
            </tr>
          )
        })
      })
      .catch(error => {
        toast.error('Hmmm. Something went wrong while retrieving feeder statuses. Please try again later.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
          
        toast.error(`Error message: ${error.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      })
  }

  render() {
    return (
      <>
        <ToastContainer />

        <h1>Feeder Status</h1>
        <br />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Feeder</th>
              <th>Status</th>
              <th>Code</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {this.state.feederList}
          </tbody>
        </Table>
      </>
    );
  }
}

export default FeederStatus
