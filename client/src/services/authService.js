import * as cookies from '../lib/cookie'

export const authService = {
  authenticate,
  logout,
  isAuthenticated
}

function authenticate() {
  const token = cookies.get('SPOTIFY_ACCESS_TOKEN')
  const refresh = cookies.get('SPOTIFY_REFRESH_TOKEN')
  if (token) {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('refresh', refresh)
    cookies.remove('SPOTIFY_ACCESS_TOKEN')
    cookies.remove('SPOTIFY_REFRESH_TOKEN')
  }

  return token
}

function logout(callback) {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('refresh')
  if (callback) callback()
}

function isAuthenticated() {
  const token = sessionStorage.getItem('token')
  return token
}
