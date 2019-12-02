import React from 'react'
import { spotifyApi } from '../api/spotifyApi'

export default class SpotifyPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.playerCheckInterval = null

    this.state = {
      loggedIn: false,
      error: '',
      trackName: 'Track Name',
      artistName: 'Artist Name',
      albumName: 'Album Name',
      playing: false,
      position: 0,
      duration: 0
    }
  }

  componentDidMount() {
    this.playerCheckInterval = setInterval(() => {
      if (window.Spotify !== null) {
        clearInterval(this.playerCheckInterval)
        spotifyApi.loadPlayer()
        spotifyApi.onPlayerReady(({ device_id }) => {
          spotifyApi.transferMyPlayback(device_id)
        })
        spotifyApi.onPlayerStateChanged(state => {
          // if we're no longer listening to music, we'll get a null state.
          if (state !== null) {
            const { current_track, position, duration } = state.track_window
            const trackName = current_track.name
            const albumName = current_track.album.name
            const artistName = current_track.artists.map(x => x.name).join(', ')
            const playing = !state.paused
            this.setState({
              position,
              duration,
              trackName,
              albumName,
              artistName,
              playing
            })
          }
        })
        spotifyApi.connect()
      }
    }, 1000)
  }
  componentWillUnmount() {
    spotifyApi.disconnect()
  }

  onPrevClick() {
    spotifyApi.previousTrack()
  }

  onPlayClick() {
    spotifyApi.togglePlay()
  }

  onNextClick() {
    spotifyApi.nextTrack()
  }

  render() {
    const { artistName, trackName, albumName, playing } = this.state
    return (
      <div>
        <p>Artist: {artistName}</p>
        <p>Track: {trackName}</p>
        <p>Album: {albumName}</p>
        <p>
          <button onClick={this.onPrevClick}>Previous</button>
          <button onClick={this.onPlayClick}>
            {playing ? 'Pause' : 'Play'}
          </button>
          <button onClick={this.onNextClick}>Next</button>
        </p>
      </div>
    )
  }
}