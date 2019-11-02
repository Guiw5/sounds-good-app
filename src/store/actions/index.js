export const authenticate = token => ({
  type: 'AUTHENTICATE',
  token
})

export const logout = token => ({
  type: 'LOGOUT',
  token
})
