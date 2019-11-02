const client_id = process.env.REACT_APP_SOUNDSGOOD_CLIENT_ID
const redirect_uri = 'http://localhost:8888/callback'
const stateKey = 'spotify_auth_state'
const scope = 'user-read-private user-read-email playlist-read-private'

class AuthService {
  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  getHashParams = () => {
    var hashParams = {}
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1)
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2])
    }

    return hashParams
  }

  /**
   * Generates a random string containing numbers and letters
   * @param  {number} length The length of the string
   * @return {string} The generated string
   */
  generateRandomString = length => {
    var text = ''
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  getAuthUrl = () => {
    // when auth process init set crsf token in localstorage
    // and it redirects to spotify login
    const state = this.generateRandomString(16)
    localStorage.setItem(stateKey, state)

    var url = 'https://accounts.spotify.com/authorize'
    url += '?response_type=token'
    url += '&client_id=' + encodeURIComponent(client_id)
    url += '&scope=' + encodeURIComponent(scope)
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri)
    url += '&state=' + encodeURIComponent(state)
    url += '&show_dialog=' + encodeURIComponent(true)

    return url
  }

  getAccessToken = () => {
    // validation from /callback?access_token=qweqweasd
    const params = this.getHashParams()
    console.log('params', params)
    const { access_token, state } = params

    const storedState = localStorage.getItem(stateKey)

    if (access_token && (state == null || state !== storedState)) {
      return null
    } else {
      localStorage.removeItem(stateKey)
      return access_token
    }
  }
}

export default new AuthService()
