import { combineReducers } from 'redux'

import { user } from './user'
import { playlists } from './playlists'

export const rootReducer = combineReducers({
  user,
  playlists
  // songs
})
