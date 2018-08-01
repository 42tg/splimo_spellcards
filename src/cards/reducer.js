const cards = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case 'ADD_CARD':
       return [ ...state, action.card]
    case 'DELETE_CARD':
      return state.filter((card) => card.id !== action.id)
    case 'UPDATE_CARD':
      console.error('Not implemented yet')
      return state
    default:
      return state
  }
}

export default cards
