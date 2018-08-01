import React from 'react'

import Card from './Card'

const CardList = ({cards, addCard, updateCard, deleteCard}) => (
  <ul>
    {cards.map((card, i) =>
      <Card key={i} {... card} deleteCard={deleteCard} updateCard={updateCard}/>
    )}
  </ul>
)
export default CardList
