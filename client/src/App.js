import React, { useState, useEffect } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import { getHashParams } from './lib/utils'
import spotifyWebApi from 'spotify-web-api-js'
import SpotifyPlayer from './components/SpotifyPlayer'

const spotifyApi = new spotifyWebApi()

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
  state = {
    redirectToHome: false
  }

  login = () => {
    let cb = () => this.setState({ redirectToHome: true })
    fakeAuth.authenticate(cb)
  }

  render() {
    const { redirectToHome } = this.state
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (redirectToHome === true) return <Redirect to={from} />

    return (
      <div>
        <p>You must be log in to view this page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }}
  />
)

const AuthButton = withRouter(({ history }) => {
  if (fakeAuth.isAuthenticated)
    return (
      <p>
        Welcome!{' '}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push('/'))
          }}>
          Signout
        </button>
      </p>
    )
  return <p>You're not logged in.</p>
})

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <AuthButton />
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>
          <Route path="/public" component={Public} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/protected" component={Protected} />
        </div>
      </Router>
    )
  }
}

/*

function Profile(props) {
  return (
    <>
      <div>
        <p>email: {props.email}</p>
      </div>
    </>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    const params = getHashParams()
    const token = params.access_token
    if (token) spotifyApi.setAccessToken(token)
    this.state = {
      loggedIn: token ? true : false
    }
  }

  getProfile = async () => {
    try {
      const profile = await spotifyApi.getMe()
      console.log(profile)
    } catch (error) {
      console.log('Houston, we have a problem', error)
    }
  }

  componentDidMount() {
    if (this.state.loggedIn) this.getProfile()
  }

  render() {
    return (
      <div className="App">
        <a href="http://localhost:8888/login">Login to spotify</a>

        {this.state.loggedIn && (
          <div>
            <Profile profile={this.getProfile()} />
            <SpotifyPlayer token={spotifyApi.getAccessToken()} />
          </div>
        )}
      </div>
    )
  }
}
*/
export default App
