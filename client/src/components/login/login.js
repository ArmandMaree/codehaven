import React from 'react';
import './Login.css';
import { Modal, Button, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.tokenCallback = props.tokenCallback
    this.closeCallback = props.closeCallback

    this.state = {
      username: undefined,
      password: undefined
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();

    const credentials = {
      username: this.state.username,
      password: this.state.password
    }

    return fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
      .then((data) => {
        this.setState({
          token: data.token
        })

        if (this.tokenCallback) {
          this.tokenCallback(data.token)
        }
      })
   }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClose() {
    this.closeCallback()
  }

  render() {
    return (
      <>
        <ToastContainer />

        <Modal animation={false} show={true} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={this.submitHandler} ref={this.formRef}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  as="input"
                  name="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.handleChange}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="cron">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  as="input"
                  name="password"
                  type="password"
                  value={this.state.password}
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
              onClick={this.handleSubmit}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default Login