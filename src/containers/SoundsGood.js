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
      <div class="container-fluid">
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
