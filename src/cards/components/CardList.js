import React from 'react'

import Card from './Card'

const CardList = ({cards, editCard, deleteCard}) => (
  <ul>
    {cards.map((card, i) =>
      <Card key={i} {... card} deleteCard={deleteCard} editCard={editCard}/>
    )}
  </ul>
)
export default CardList
