import React from "react"
import { Modal, Button, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

class EditFeederModal extends React.Component {
  constructor(props) {
    super(props)
    this.refreshCallback = props.refreshCallback

    this.state = {
      show: false,
      saveButtonDisabled: true,
      id: props.feederId,
      name: null,
      defaultDuration: null
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getFeeder = this.getFeeder.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
  }

  handleClose() {
    this.setState({
      show: false
    })

    this.refreshCallback()
  }

  handleShow() {
    const thisEditFeederModal = this

    this.getFeeder(this.state.id)
      .then(feeder => {
        const state = {
          ...feeder,
          saveButtonDisabled: false
        }
    
        thisEditFeederModal.setState(state)
      })

    this.setState({
      show: true,
      saveButtonDisabled: true
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  getFeeder(feederId) {
    const requestOptions = {
      method: 'GET'
    }

    return fetch(`/api/aquarium-manager/feeders/${feederId}`, requestOptions)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        return response.json()
      })
      .catch(error => {
        toast.error('Hmmm. Something went wrong while retrieving feeder. Please try again later.', {
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

  handleSave() {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        defaultDuration: this.state.defaultDuration
      })
    }

    this.setState({
      saveButtonDisabled: true
    })

    fetch(`/api/aquarium-manager/feeders/${this.state.id}`, requestOptions)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText)
        }
        
        toast.success('Saved successfully!', {
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
          saveButtonDisabled: false
        })

        this.handleClose()
      })
      .catch(error => {
        toast.error('Hmmm. Something went wrong while trying to save. Please try again later.', {
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
          saveButtonDisabled: false
        })
      })
  }

  handleDelete() {
    const requestOptions = {
      method: 'DELETE',
      headers: {}
    }

    this.setState({
      saveButtonDisabled: true
    })

    fetch(`/api/aquarium-manager/feeders/${this.state.id}`, requestOptions)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText)
        }
        
        toast.success('Deleted successfully!', {
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
          saveButtonDisabled: false
        })

        this.handleClose()
      })
      .catch(error => {
        toast.error('Hmmm. Something went wrong while trying to delete. Please try again later.', {
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
          saveButtonDisabled: false
        })
      })
  }

  render() {
    return (
      <>
        <ToastContainer />

        <Button
          variant="link"
          onClick={this.handleShow}
          style={{padding: 0}}>
          Edit
        </Button>

        <Modal animation={false} show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Feeder</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={this.submitHandler} ref={this.formRef}>
              <Form.Group controlId="id">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  as="input"
                  name="id"
                  type="text"
                  plaintext
                  readOnly
                  value={this.state.id}
                  onChange={this.handleChange}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  as="input"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="defaultDuration">
                <Form.Label>Duration (ms)</Form.Label>
                <Form.Control
                  as="input"
                  name="defaultDuration"
                  type="number"
                  value={this.state.defaultDuration}
                  onChange={this.handleChange}>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="danger" 
              onClick={this.handleDelete}
              disabled={this.state.saveButtonDisabled}>
              Delete
            </Button>
            <Button
              variant="primary" 
              onClick={this.handleSave}
              disabled={this.state.saveButtonDisabled}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default EditFeederModal
