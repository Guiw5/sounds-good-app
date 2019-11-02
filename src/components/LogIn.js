import React from 'react'
import { Button } from 'reactstrap'
import authService from '../services/authService'

export default class LogIn extends React.Component {
  login = () => {
    const url = authService.getAuthUrl()
    window.location = url
  }

  render() {
    return (
      <>
        <p>Welcome!!, Please login with your spotify account</p>
        <Button onClick={this.login}>Login</Button>
      </>
    )
  }
}
