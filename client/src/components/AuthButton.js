import React from 'react'
import { withRouter } from 'react-router-dom'

import { authService } from '../services/authService'

export const AuthButton = withRouter(({ history }) => {
  if (authService.isAuthenticated())
    return (
      <p>
        Welcome!{' '}
        <button
          onClick={() => {
            authService.logout(() => history.push('/'))
          }}>
          Signout
        </button>
      </p>
    )
  return <p>You're not logged in.</p>
})
