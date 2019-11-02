import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'

import * as authActions from '../store/actions/index'
import * as selectors from '../store/reducers/selectors'
import authService from '../services/authService'

class Callback extends React.Component {
  componentDidMount() {
    const token = authService.getAccessToken()
    if (token !== null) {
      this.props.authenticate(token)
    }
  }

  render() {
    if (!this.props.isLogged)
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
const mapStateToProps = state => ({
  isLogged: selectors.isLogged(state)
})

const mapDispatchToProps = dispatch => ({
  authenticate: accessToken => dispatch(authActions.authenticate(accessToken))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Callback)
