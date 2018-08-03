import { combineReducers } from 'redux'
import cards from './cards/reducer'
import chars from './chars/reducer'
import { reducer as reduxFormReducer } from 'redux-form';


export default combineReducers({
  chars,
  cards,
  form : reduxFormReducer
})
