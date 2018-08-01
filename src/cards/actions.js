let id = 0
export const addCard = card => ({
  type: 'ADD_CARD',
  card: { ...card, id: id++ }
})

export const updateCard = (id, card) => ({
  type: 'UPDATE_CARD',
  id,
  card
})

export const deleteCard = id => ({
  type: 'DELETE_CARD',
  id
})

