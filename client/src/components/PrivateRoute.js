import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { authService } from '../services/authService'

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (authService.getToken()) return <Component {...props} />
      else
        return (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    }}
  />
)
