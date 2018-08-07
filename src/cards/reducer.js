import {List} from 'immutable'

const cards = (state = List(), action) => {
  switch (action.type) {
    case 'ADD_CARD':
       return state.push(action.card)
    case 'DELETE_CARD':
      return state.filter((card) => card.id !== action.id)
    case 'UPDATE_CARD':
      return state.map(card => {
        if(card.id === action.id) {
          return action.card
        }
        return card
      })
    case 'USER_LOGOUT':
      return List()
    default:
      return state
  }
}

export default cards
