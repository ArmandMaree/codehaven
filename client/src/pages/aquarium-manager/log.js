import React from "react"
import Table from 'react-bootstrap/Table'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

class FeederLogs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logList: []
    }

    this.getLogList = this.getLogList.bind(this)
    this.tick = this.tick.bind(this)
    this.getLogs = this.getLogs.bind(this)
  }

  componentDidMount() {
    document.title = "Logs - Feeders - CodeHaven"
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
    const thisFeederLogs = this

    this.getLogs()
      .then((logs) => {
        thisFeederLogs.logs = logs
    
        thisFeederLogs.setState({
          logList: thisFeederLogs.getLogList(thisFeederLogs.logs)
        });
      })
  }

  getLogs() {
    const requestOptions = {
      method: 'GET'
    }

    return fetch(`/api/aquarium-manager/logs?limit=20&skip=0`, requestOptions)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        return response.json()
      })
      .catch(error => {
        toast.error('Hmmm. Something went wrong while retrieving feeder logs. Please try again later.', {
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

  getLogList(logs) {
    return logs.map((log) => {
      return (
        <tr>
          <td>{(new Date(log.timestamp)).toLocaleString()}</td>
          <td>{log.name}</td>
          <td>{log.duration}</td>
          <td>{log.actor}</td>
          <td>{log.status}</td>
          <td>{log.message}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <>
        <ToastContainer />

        <h1>Feeder Log</h1>
        <br />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Name</th>
              <th>Duration</th>
              <th>Actor</th>
              <th>Status</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {this.state.logList}
          </tbody>
        </Table>
      </>
    );
  }
}

export default FeederLogs
