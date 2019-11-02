export const isLogged = state => state.auth.token

export const getProfile = state => state.user.profile

export const getProfileLoading = state => state.user.loading

export const getProfileError = state => state.user.error
