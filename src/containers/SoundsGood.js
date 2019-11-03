import React from 'react'
import { Redirect } from 'react-router-dom'
import Profile from './Profile'
import Playlists from './Playlists'
import Songs from './Songs'

import authService from '../services/authService'

export default class SoundsGood extends React.Component {
  render() {
    if (!authService.isLogged()) return <Redirect to="/" />

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Profile />
          </div>
          <div
            className="col col-8"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}
          >
            <div className="row" style={{ padding: '10px' }}>
              <Playlists />
            </div>
            <div className="row">
              <Songs />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
