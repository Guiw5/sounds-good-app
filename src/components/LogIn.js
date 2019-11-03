import React from 'react'
import { Button } from 'reactstrap'
import authService from '../services/authService'

export default class LogIn extends React.Component {
  /**
   * Redirect to Spotify Auth Flow
   * */
  login = () => {
    const url = authService.getAuthUrl()
    window.location = url
  }

  render() {
    return (
      <div className={'login'}>
        <p>
          Welcome!! Please login with your{' '}
          <a style={{ color: '#1db954' }}>Spotify</a> account
        </p>
        <p>
          <Button onClick={this.login}>Login</Button>
        </p>
      </div>
    )
  }
}
