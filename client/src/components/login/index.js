import React from 'react';
import './login.css';
import { Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Login from './login'

class LoginWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.tokenCallback = props.tokenCallback

    this.state = {
      showLogin: false,
      token: JSON.parse(sessionStorage.getItem('userToken'))?.token
    }

    this.setToken = this.setToken.bind(this)
    this.handleShowLogin = this.handleShowLogin.bind(this)
    this.handleCloseLogin = this.handleCloseLogin.bind(this)
  }

  setToken(token) {
    this.setState({
      token
    })

    if (this.tokenCallback) {
      this.tokenCallback(token)
    }

    sessionStorage.setItem('userToken', JSON.stringify({ token }));
  }

  handleShowLogin() {
    this.setState({
      showLogin: true
    })
  }

  handleCloseLogin() {
    this.setState({
      showLogin: false
    })
  }

  render() {
    let wrapper

    if (this.state.token) {
      wrapper = <span>Hello!</span>;
    }
    else {
      let loginComponent

      if (this.state.showLogin) {
        loginComponent = <Login tokenCallback={this.setToken} closeCallback={this.handleCloseLogin} />;
      }

      wrapper = (
        <>
          <ToastContainer />
          <Button
            variant="primary"
            onClick={this.handleShowLogin}>
            Login
          </Button>
  
          {loginComponent}
        </>
      )
    }

    return wrapper
  }
}

export default LoginWrapper