import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'

import authService from '../services/authService'

class Callback extends React.Component {
  constructor(props) {
    super(props)

    /**
     * Callback succeds with results of authentication (token)
     */
    this.state = {
      token: authService.authenticate()
    }
  }

  render() {
    if (!this.state.token)
      return (
        <>
          <p>Oops, could not logged in correctly</p>
          <Link to="/" component={Button}>
            Go Back
          </Link>
        </>
      )
    return <Redirect to="/me" />
  }
}

export default Callback
