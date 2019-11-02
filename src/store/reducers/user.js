const initialState = {
  profile: null,
  loading: false,
  error: null
}

export function user(state = initialState, action) {
  switch (action.type) {
    case 'GET_PROFILE_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'GET_PROFILE_SUCCESS':
      return { ...state, profile: action.profile, loading: false }
    case 'GET_PROFILE_ERROR':
      return { ...state, error: action.error, loading: false }
    default:
      return state
  }
}
