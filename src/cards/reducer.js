const cards = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CARD':
       return [ ...state, action.card]
    case 'DELETE_CARD':
      return state.filter((card) => card.id !== action.id)
    case 'UPDATE_CARD':
      console.log(state, action)
      return state.map(card => {
        if(card.id === action.id) {
          return action.card
        } 
        return card
      })
    default:
      return state
  }
}

export default cards
