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

export const getPlaylistsSuccess = data => ({
  type: 'GET_PLAYLISTS_SUCCESS',
  data
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

    let spotifyLists = data.items.slice(0, 5)

    const playlists = spotifyLists.map(spotList => {
      return {
        id: spotList.id,
        src:
          spotList.images.length > 1
            ? spotList.images.find(x => x.height === 300).url
            : spotList.images[0].url,
        name: spotList.name,
        display_name: spotList.owner.display_name,
        tracks: spotList.tracks,
        uri: spotList.uri,
        collaborative: spotList.collaborative,
        public: spotList.public
      }
    })

    dispatch(getPlaylistsSuccess(playlists))
  } catch (error) {
    dispatch(getPlaylistsError(error))
  }
}

export const getSongsRequest = () => ({
  type: 'GET_SONGS_REQUEST'
})

export const getSongsSuccess = data => ({
  type: 'GET_SONGS_SUCCESS',
  data
})

export const getSongsError = () => ({
  type: 'GET_SONGS_ERROR'
})

export const setPlaylist = playlist_id => async dispatch => {
  try {
    const token = authService.getAccessToken()
    dispatch(getSongsRequest())

    let { data } = await http.get(`/playlists/${playlist_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    const spotiSongs = data.tracks.items.slice(0, 5)

    const playlist = spotiSongs.map(t => {
      return {
        name: t.track.name,
        album: t.track.album.name,
        artists: t.track.artists.map(a => {
          return { name: a.name, uri: a.uri, id: a.id }
        })
      }
    })
    // id: data.id,
    // description: data.description,
    // name: data.name,
    // owner: data.owner.display_name,
    // href: data.href,

    console.log('das', playlist)

    dispatch(getSongsSuccess(playlist))
  } catch (error) {
    // authService.logout()
    dispatch(getSongsError(error))
  }
}
