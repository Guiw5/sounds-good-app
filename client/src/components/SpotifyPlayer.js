import React from 'react'
import { authService } from '../services/authService'
import { spotifyApi } from '../api/spotifyApi'

export default class SpotifyPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.playerCheckInterval = null
    this.player = null

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
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000)
  }

  transferPlaybackHere() {
    const { deviceId } = this.state
    const token = authService.isAuthenticated()
    fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        play: true
      })
    })
  }

  createEventHandlers() {
    this.player.on('initialization_error', e => {
      console.error(e)
    })
    this.player.on('authentication_error', e => {
      console.error('autherror', e)
      this.setState({ loggedIn: false })
    })
    this.player.on('account_error', e => {
      console.error(e)
    })
    this.player.on('playback_error', e => {
      console.error(e)
    })

    // Playback status updates
    this.player.on('player_state_changed', state => this.onStateChanged(state))

    // Ready
    this.player.on('ready', data => {
      let { device_id } = data
      spotifyApi.transferMyPlayback(device_id)
    })
  }

  onStateChanged(state) {
    // if we're no longer listening to music, we'll get a null state.
    if (state !== null) {
      console.log('spotiState', state)
      const { current_track, position, duration } = state.track_window
      const trackName = current_track.name
      const albumName = current_track.album.name
      const artistName = current_track.artists
        .map(artist => artist.name)
        .join(', ')
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
  }

  checkForPlayer() {
    if (window.Spotify !== null) {
      clearInterval(this.playerCheckInterval)
      const token = authService.isAuthenticated()
      this.player = new window.Spotify.Player({
        name: 'SoundsGood Player',
        getOAuthToken: cb => {
          cb(token)
        }
      })

      this.createEventHandlers()

      // Connect to the player!
      this.player.connect()
    }
  }

  onPrevClick() {
    this.player.previousTrack()
  }

  onPlayClick() {
    this.player.togglePlay()
  }

  onNextClick() {
    this.player.nextTrack()
  }

  render() {
    const { artistName, trackName, albumName, playing } = this.state
    return (
      <div>
        <p>Artist: {artistName}</p>
        <p>Track: {trackName}</p>
        <p>Album: {albumName}</p>
        <p>
          <button onClick={() => this.onPrevClick()}>Previous</button>
          <button onClick={() => this.onPlayClick()}>
            {playing ? 'Pause' : 'Play'}
          </button>
          <button onClick={() => this.onNextClick()}>Next</button>
        </p>
      </div>
    )
  }
}
