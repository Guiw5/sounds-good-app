import SpotifyWebApi from 'spotify-web-api-js'
import { authService } from '../services/authService'

class SpotifyApi extends SpotifyWebApi {
  constructor() {
    super()
    const token = authService.isAuthenticated()
    this.setAccessToken(token)
  }

  transferMyPlayback(device, play = true) {
    return super.transferMyPlayback([device], { play })
  }
  /** cuando puede darse que se elimine el token del sessionStorage?
   *        1) al hacer authService.logout()
   *        2) al cerrar la pagina
   *  y no se elimine de la variable de instancia de spotifyApi() ?
   *        1)
   * */
}

const spotifyApi = new SpotifyApi()

export { spotifyApi }
