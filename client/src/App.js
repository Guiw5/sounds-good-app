import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { PrivateRoute } from './components/PrivateRoute'
import { AuthButton } from './components/AuthButton'
import { Login } from './components/Login'
import SpotifyPlayer from './components/SpotifyPlayer'

const Index = () => <h3>Public</h3>

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <AuthButton />
          <ul>
            <li>
              <Link to="/index">Public Page</Link>
            </li>
            <li>
              <Link to="/home">SoundsGood Player</Link>
            </li>
          </ul>
          <Route path="/index" component={Index} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/home" component={SpotifyPlayer} />
        </div>
      </Router>
    )
  }
}

export default App
