import React from "react"
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

class FeederForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feederList: [],
      submitButtonDisabled: true
    }

    this.getFeeders = this.getFeeders.bind(this)
    this.getFeederList = this.getFeederList.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  componentDidMount() {
    const thisFeederForm = this

    this.getFeeders()
      .then(feeders => {
        thisFeederForm.feeders = feeders
    
        const state = {
          feederList: thisFeederForm.getFeederList(thisFeederForm.feeders),
          submitButtonDisabled: false
        }
    
        if (thisFeederForm.feeders.length > 0) {
          state.feederId = thisFeederForm.feeders[0].id
          state.duration = thisFeederForm.feeders[0].defaultDuration
        }
    
        thisFeederForm.setState(state)
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
    return feeders.map((feeder) => <option value={feeder.id.toString()}>{feeder.name}</option>)
  }

  handleChange(event) {
    const state = {}
    state[event.target.name] = event.target.value
    this.setState(state)
  }

  submitHandler(event) {
    event.preventDefault()

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        feederId: this.state.feederId,
        duration: this.state.duration
      })
    }

    this.setState({
      submitButtonDisabled: true
    })

    fetch(`/api/aquarium-manager/feed`, requestOptions)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText)
        }
      })
      .then(() => {
        toast.success('Feeder triggered successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })

        this.setState({
          submitButtonDisabled: false
        })
      })
      .catch(error => {
        toast.error('Hmmm. Something went wrong while trying to feed. Please try again later.', {
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

        this.setState({
          submitButtonDisabled: false
        })
      })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col />
          <Col xs={12} md={4}>
            <ToastContainer />
            <Form onSubmit={this.submitHandler} ref={this.formRef}>
              <Form.Group controlId="feederSelect">
                <Form.Label>Feeder</Form.Label>
                <Form.Control
                  as="select"
                  name="feederId"
                  value={this.state.feederId}
                  onChange={this.handleFeederChange}>
                  <option disabled selected>Select a Feeder</option>
                  {this.state.feederList}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="feedDuration">
                <Form.Label>Duration (ms)</Form.Label>
                <Form.Control
                  as="input"
                  name="duration"
                  type="number"
                  value={this.state.duration}
                  onChange={this.handleChange}>
                </Form.Control>
              </Form.Group>
              <br />
              <Button
                variant="primary"
                type="submit"
                disabled={this.state.submitButtonDisabled}>
                Feed
              </Button>
            </Form>
          </Col>
          <Col />
        </Row>
      </Container>
    )
  }
}

export default FeederForm
