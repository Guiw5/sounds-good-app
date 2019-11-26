import React from 'react'
import { Redirect, Link } from 'react-router-dom'

import { authService } from '../services/authService'

export class Login extends React.Component {
  state = { isAuthenticated: authService.isAuthenticated() }

  componentDidMount() {
    if (!this.state.isAuthenticated) {
      const token = authService.authenticate()
      this.setState({ isAuthenticated: token })
    }
  }

  login() {
    // this.setState({ loggingIn: true })
    window.location = 'http://localhost:8888/login'
  }

  render() {
    const { isAuthenticated } = this.state
    const { from } = this.props.location.state || {
      from: { pathname: '/home' }
    }
    if (isAuthenticated) return <Redirect to={from} />
    return (
      <div>
        <p>You must be log in to view this page at {from.pathname}</p>
        <button onClick={this.login}>Log In</button>
      </div>
    )
  }
}
