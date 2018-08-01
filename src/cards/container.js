import CardList from './components/CardList'
import CardForm from './components/CardForm'
import { connect } from 'react-redux'
import { addCard, updateCard, deleteCard } from './actions'


const CardListContainerMapStateToProps = state => {
  return {
    cards: state.cards
  }
}
const CardListContainerMapDispatchToProps = dispatch => ({
  updateCard: (id, card) => dispatch(updateCard(id, card)),
  deleteCard: id => dispatch(deleteCard(id))
})

export const CardListContainer = connect(
  CardListContainerMapStateToProps,
  CardListContainerMapDispatchToProps
)(CardList)

const CardFormContainerMapDispatchToProps = dispatch => ({
  addCard: card => dispatch(addCard(card))
})

export const CardFormContainer = connect(
  null,
  CardFormContainerMapDispatchToProps
)(CardForm)
