const initialState = {
  data: [],
  loading: false,
  error: null
}

export function playlists(state = initialState, action) {
  switch (action.type) {
    case 'GET_PLAYLISTS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'GET_PLAYLISTS_SUCCESS':
      return { ...state, data: action.data, loading: false }
    case 'GET_PLAYLISTS_ERROR':
      return { ...state, error: action.error, loading: false }
    default:
      return state
  }
}
