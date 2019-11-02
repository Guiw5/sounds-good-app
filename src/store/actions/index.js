import { http } from '../../http/client'

export const authenticate = token => ({
  type: 'AUTHENTICATE',
  token
})

export const logout = token => ({
  type: 'LOGOUT',
  token
})

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

export const getProfile = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token
    dispatch(getProfileRequest())
    let { data } = await http.get(`/me`, {
      headers: { Authorization: 'Bearer ' + token }
    })

    console.log('data', data)
    dispatch(getProfileSuccess(data))
  } catch (error) {
    console.log('loadOrder', error)
    dispatch(getProfileError(error))
  }
}
