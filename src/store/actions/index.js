import { http } from '../../http/client'
import authService from '../../services/authService'

export const getProfileRequest = () => ({
  type: 'GET_PROFILE_REQUEST'
})

export const getProfileSuccess = profile => ({
  type: 'GET_PROFILE_SUCCESS',
  profile
})

export const getProfileError = () => ({
  type: 'GET_PROFILE_ERROR'
})

export const getProfile = () => async dispatch => {
  try {
    const token = authService.getAccessToken()
    dispatch(getProfileRequest())
    let { data } = await http.get(`/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    dispatch(getProfileSuccess(data))
  } catch (error) {
    dispatch(getProfileError(error))
  }
}

export const getPlaylistsRequest = () => ({
  type: 'GET_PLAYLISTS_REQUEST'
})

export const getPlaylistsSuccess = profile => ({
  type: 'GET_PLAYLISTS_SUCCESS',
  profile
})

export const getPlaylistsError = () => ({
  type: 'GET_PLAYLISTS_ERROR'
})

export const getPlaylists = () => async dispatch => {
  try {
    const token = authService.getAccessToken()
    dispatch(getPlaylistsRequest())
    let { data } = await http.get(`/me/playlists`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    dispatch(getPlaylistsSuccess(data))
  } catch (error) {
    dispatch(getPlaylistsError(error))
  }
}
