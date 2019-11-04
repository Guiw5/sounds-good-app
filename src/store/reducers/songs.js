const initialState = {
  data: [],
  loading: false,
  error: null
}

export function songs(state = initialState, action) {
  switch (action.type) {
    case 'GET_SONGS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'GET_SONGS_SUCCESS':
      return { ...state, data: action.data, loading: false }
    case 'GET_SONGS_ERROR':
      return { ...state, error: action.error, loading: false }
    default:
      return state
  }
}
