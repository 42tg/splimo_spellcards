let id = 1
export const addCard = card => ({
  type: 'ADD_CARD',
  card: { ...card, id: id++ }
})

export const updateCard = (id, card) => {
  console.log(id,card)
  return ({
  type: 'UPDATE_CARD',
  id,
  card: { ...card}
})
}

export const deleteCard = id => ({
  type: 'DELETE_CARD',
  id
})

export const editCard = (id, card) => ({
  type: 'EDIT_CARD',
  id,
  card
})
