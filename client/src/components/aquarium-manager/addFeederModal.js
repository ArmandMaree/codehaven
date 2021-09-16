import React from "react"
import { Modal, Button, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

class AddFeederModal extends React.Component {
  constructor(props) {
    super(props)
    this.refreshCallback = props.refreshCallback

    this.state = {
      show: false,
      saveButtonDisabled: false,
      name: null,
      defaultDuration: 1000
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleClose() {
    this.setState({
      show: false
    })

    this.refreshCallback()
  }

  handleShow() {
    this.setState({
      show: true
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSave() {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        defaultDuration: this.state.defaultDuration
      })
    }

    this.setState({
      saveButtonDisabled: true
    })

    fetch(`/api/aquarium-manager/feeders`, requestOptions)
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

  render() {
    return (
      <>
        <ToastContainer />

        <Button
          variant="primary"
          onClick={this.handleShow}>
          Add New Device
        </Button>

        <Modal animation={false} show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Feeder</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={this.submitHandler} ref={this.formRef}>
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

export default AddFeederModal
