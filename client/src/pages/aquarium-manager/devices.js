import React from "react"
import { Table } from 'react-bootstrap'
import EditFeederModal from '../../components/aquarium-manager/editFeederModal'
import AddFeederModal from '../../components/aquarium-manager/addFeederModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

class FeederDevices extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feederList: []
    }

    this.getFeederList = this.getFeederList.bind(this)
    this.tick = this.tick.bind(this)
    this.getFeeders = this.getFeeders.bind(this)
  }

  componentDidMount() {
    document.title = "Devices - Feeders - CodeHaven"
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
    const thisFeederDevices = this

    this.getFeeders()
      .then(feeders => {
        thisFeederDevices.feeders = feeders

        thisFeederDevices.setState({
          feederList: thisFeederDevices.getFeederList(thisFeederDevices.feeders)
        })
      })
  }

  getFeeders() {
    const requestOptions = {
      method: 'GET'
    }

    return fetch(`/api/aquarium-manager/feeders`, requestOptions)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        return response.json()
      })
      .catch(error => {
        toast.error('Hmmm. Something went wrong while retrieving feeders. Please try again later.', {
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

  getFeederList(feeders) {
    return feeders.map((feeder) => {
      const modal = (
        <EditFeederModal feederId={feeder.id} refreshCallback={this.tick} />
      )

      return (
        <tr key={feeder.id}>
          <td>{feeder.id}</td>
          <td>{feeder.name}</td>
          <td>{feeder.defaultDuration}</td>
          <td>{modal}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <>
        <ToastContainer />

        <h1>Feeder Devices</h1>
        <br />
        <AddFeederModal refreshCallback={this.tick} />
        <br />
        <br />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Default Duration</th>
              <th></th>
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

export default FeederDevices
