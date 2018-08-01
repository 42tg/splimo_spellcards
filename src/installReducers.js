import { combineReducers } from 'redux'
import cards from './cards/reducer'
import chars from './chars/reducer'


export default combineReducers({
  chars,
  cards
})
