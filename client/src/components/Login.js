import React from 'react'
import { Redirect } from 'react-router-dom'

import { authService } from '../services/authService'

export class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isAuthenticated: authService.getToken() }
  }

  login() {
    window.location = 'http://localhost:8888/auth'
  }

  render() {
    const { isAuthenticated } = this.state
    if (isAuthenticated) return <Redirect to="/home" />
    return (
      <div>
        <p>You must be log in to view this page at "/home"</p>
        <button onClick={this.login}>Log In</button>
      </div>
    )
  }
}
