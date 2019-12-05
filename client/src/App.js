import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { PrivateRoute } from './components/PrivateRoute'
import { Login } from './components/Login'
import { Home } from './components/Home'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/home" component={Home} />
          <Route
            render={props => {
              return <p>Not Found</p>
            }}
          />
        </Switch>
      </Router>
    )
  }
}

export default App
