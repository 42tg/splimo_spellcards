import CardList from './components/CardList'
import CardForm from './components/CardForm'
import { connect } from 'react-redux'
import { addCard, updateCard, deleteCard, editCard} from './actions'


const CardListContainerMapStateToProps = state => {
  return {
    cards: state.cards
  }
}
const CardListContainerMapDispatchToProps = dispatch => ({
  editCard: (id, card) => dispatch(editCard(id, card)),
  deleteCard: id => dispatch(deleteCard(id)),
})

export const CardListContainer = connect(
  CardListContainerMapStateToProps,
  CardListContainerMapDispatchToProps
)(CardList)

const CardFormContainerMapStateToProps = state => {
  return {
    cardAdd: state.cardAdd
  }
}
const CardFormContainerMapDispatchToProps = dispatch => ({
  addCard: card => dispatch(addCard(card)),
  updateCard: (id, card) => dispatch(updateCard(id, card))
})

export const CardFormContainer = connect(
  CardFormContainerMapStateToProps,
  CardFormContainerMapDispatchToProps
)(CardForm)
