import { combineReducers } from 'redux'

import { user } from './user'
import { playlists } from './playlists'
import { songs } from './songs'

export const rootReducer = combineReducers({
  user,
  playlists,
  songs
})
