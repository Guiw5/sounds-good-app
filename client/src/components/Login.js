import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'
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
      <div className={'login'}>
        <p>Welcome!! Please login with your Spotify account</p>
        <p>
          <Button onClick={this.login}>Log In</Button>
        </p>
      </div>
    )
  }
}
