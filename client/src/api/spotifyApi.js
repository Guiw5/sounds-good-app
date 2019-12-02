import SpotifyWebApi from 'spotify-web-api-js'
import { authService } from '../services/authService'

class SpotifyApi extends SpotifyWebApi {
  constructor() {
    super()
    this.loadToken()
    this.player = null
  }

  connect() {
    this.player.connect()
  }

  disconnect() {
    this.player.disconnect()
  }

  previousTrack() {
    this.player.previousTrack()
  }

  togglePlay() {
    this.player.togglePlay()
  }

  nextTrack() {
    this.player.nextTrack()
  }

  loadToken() {
    const token = authService.getToken()
    if (token) {
      this.setAccessToken(token)
    } else console.log('no token')
  }

  async transferMyPlayback(device, play = false) {
    try {
      await super.transferMyPlayback([device], { play })
    } catch (error) {
      /**
       * if responses 401 Unauthorized (invalid token)
       * we have to refresh the token
       * and do it again
       * */
      if (error.status === 401) {
        await authService.refreshToken()
        this.loadToken()
        await this.transferMyPlayback(device, play)
      }
    }
  }

  loadPlayer() {
    const token = authService.getToken()
    const init = { name: 'SoundsGood Player', getOAuthToken: cb => cb(token) }
    this.player = new window.Spotify.Player(init)
  }

  onInitializationError(cb) {
    this.player.on('initialization_error', e => cb(e))
  }

  onAuthenticationError(cb) {
    this.player.on('authentication_error', cb)
  }

  onAccountError(cb) {
    this.player.on('account_error', e => cb(e))
  }

  onPlaybackError(cb) {
    this.player.on('playback_error', e => cb(e))
  }

  onPlayerStateChanged(cb) {
    this.player.on('player_state_changed', cb)
  }

  onPlayerReady(cb) {
    this.player.on('ready', cb)
  }
}

const spotifyApi = new SpotifyApi()

export { spotifyApi }
