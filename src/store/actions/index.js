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
    console.log('token', token)
    dispatch(getProfileRequest())
    let { data } = await http.get(`/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    console.log('data', data)
    dispatch(getProfileSuccess(data))
  } catch (error) {
    console.log('profile', error)
    dispatch(getProfileError(error))
  }
}
