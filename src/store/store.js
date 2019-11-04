import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers/root'
import { http } from '../http/client'

export default createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(http))
)
