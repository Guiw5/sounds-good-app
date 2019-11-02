import React from 'react'
import Profile from './Profile'

function Playlists() {
  return <div>playlists</div>
}

function Songs() {
  return <div>songs</div>
}

export default class SoundsGood extends React.Component {
  render() {
    return (
      <>
        <Profile />
        <Playlists />
        <Songs />
      </>
    )
  }
}
