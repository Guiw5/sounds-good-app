import React from 'react'
import Profile from './Profile'
import authService from '../services/authService'

import { Redirect } from 'react-router-dom'

function Playlists() {
  return <div>playlists</div>
}

function Songs() {
  return <div>songs</div>
}

export default class SoundsGood extends React.Component {
  render() {
    if (!authService.isLogged()) return <Redirect to="/" />

    return (
      <div class="container">
        <div class="row">
          <div class="col">
            <Profile />
          </div>
          <div class="col">
            <Playlists />
          </div>
          <div class="col">
            <Songs />
          </div>
        </div>
      </div>
    )
  }
}
