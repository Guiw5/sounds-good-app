import * as cookies from '../lib/cookie'
import { server } from '../http/axios'

export const authService = {
  logout,
  getToken,
  refreshToken
}

function logout(callback) {
  cookies.remove('token')
  if (callback) callback()
}

function getToken() {
  const token = cookies.get('token')
  return token
}

async function refreshToken() {
  try {
    await server.get('refresh')
  } catch (error) {
    console.log(error)
  }
}
