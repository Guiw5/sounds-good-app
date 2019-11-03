import React from 'react'
import { Redirect } from 'react-router-dom'
import Profile from './Profile'
import Playlists from './Playlists'
import authService from '../services/authService'

function Songs() {
  return <div>songs</div>
}

export default class SoundsGood extends React.Component {
  render() {
    if (!authService.isLogged()) return <Redirect to="/" />

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Profile />
          </div>
          <div className="col">
            <div className="row" styles={{ padding: '10px' }}>
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
