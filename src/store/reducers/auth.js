const initialState = {
  token: null
}

export function auth(state = initialState, action) {
  switch (action.type) {
    case 'AUTHENTICATE':
      console.log(action)
      return { ...state, token: action.token }
    case 'LOGOUT':
      return { ...state, token: null }
    default:
      return state
  }
}
