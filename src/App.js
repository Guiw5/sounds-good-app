import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './store/store'
import './App.css'

import Layout from './components/Layout'
import LogIn from './components/LogIn'
import Callback from './containers/Callback'
import SoundsGood from './containers/SoundsGood'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Route path="/" exact component={LogIn} />
          <Route path="/callback" component={Callback} />
          <Route path="/home" component={SoundsGood} />
        </Layout>
      </Router>
    </Provider>
  )
}

export default App
