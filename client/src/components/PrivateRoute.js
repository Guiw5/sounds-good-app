import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { authService } from '../services/authService'

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (authService.isAuthenticated()) return <Component {...props} />
      else
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
    }}
  />
)
