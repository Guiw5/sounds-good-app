import React from 'react'

export default class SpotifyPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.playerCheckInterval = null
  }

  componentDidMount() {
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000)
  }

  createEventHandlers = player => {
    // Error handling
    player.addListener('initialization_error', ({ message }) => {
      console.error(message)
    })
    player.addListener('authentication_error', ({ message }) => {
      console.error(message)
    })
    player.addListener('account_error', ({ message }) => {
      console.error(message)
    })
    player.addListener('playback_error', ({ message }) => {
      console.error(message)
    })

    // Playback status updates
    player.addListener('player_state_changed', state => {
      console.log(state)
    })

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id)
    })

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id)
    })
  }

  checkForPlayer() {
    if (window.Spotify !== null) {
      clearInterval(this.playerCheckInterval)
      const token = this.props.token
      const player = new window.Spotify.Player({
        name: 'SoundsGood Player',
        getOAuthToken: cb => {
          cb(token)
        }
      })

      this.createEventHandlers(player)

      // Connect to the player!
      player.connect()
    }
  }

  render() {
    return <div>Player</div>
  }
}
