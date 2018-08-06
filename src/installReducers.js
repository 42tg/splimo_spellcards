import { combineReducers } from 'redux'
import cards from './cards/reducer'
import chars from './chars/reducer'
import user from './firebase/reducer'
import { reducer as reduxFormReducer } from 'redux-form';


export default combineReducers({
  chars,
  cards,
  user,
  form : reduxFormReducer.plugin({
    cardAdd : (state, action) => {
      switch(action.type){
        case 'EDIT_CARD':

          console.log(state,action)
          return {
            ...state,
            values: {
              ...action.card
            }
          }

        default:
          return state;
      }
    }
  })
})
