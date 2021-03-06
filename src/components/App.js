import React, { Component } from 'react'

import {UserBar} from './UserBar'
import {Card} from './Card'
import {CardAddForm} from './CardAddForm'

import {EventTypes} from '../eventBus'
import {Auth, Database} from './Firebase'

import _ from 'lodash'

import '../App.css'
import '../App.mobile.css'
import './Loader.css'
class App extends Component {
  constructor(props) {
    super(props)

    props.bus.on(EventTypes.CARD_SAVE, this.saveCard)
    props.bus.on(EventTypes.CARD_ADDED, this.addCard)
    props.bus.on(EventTypes.CARD_EDITED, this.editedCard)
    props.bus.on(EventTypes.CARD_DELETE, this.deleteCard)
    props.bus.on(EventTypes.CARD_DELETED, this.deletedCard)
    props.bus.on(EventTypes.CARD_DELETE_ALL, this.resetAll)

    props.bus.on(EventTypes.USER_LOGIN, this.login)
    props.bus.on(EventTypes.USER_LOGOUT, this.logout)
    props.bus.on(EventTypes.USER_GOOGLE_LOGIN, Auth().loginWithGoogle)


    Auth().onAuthStateChanged(this.checkLoginState)
    const cards = []
    this.state = {
      auth : {isLoggedIn : false},
      cards : cards,
      loading: true
    }
  }

  checkLoginState = async () => {
    const isLoggedIn = await Auth().isLoggedIn()
    if(isLoggedIn)
    {
      Database().onCardAdded(this.props.bus.emit.bind(this.props.bus, EventTypes.CARD_ADDED))
      Database().onCardChanged(this.props.bus.emit.bind(this.props.bus, EventTypes.CARD_EDITED))
      Database().onCardDeleted(this.props.bus.emit.bind(this.props.bus, EventTypes.CARD_DELETED))
      this.setState({
        auth: { isLoggedIn : isLoggedIn},
        user: await Auth().getUserData(),
        cards: await Database().getCards(),
        loading: false
      })
    } else {
      this.setState({
        auth: { isLoggedIn : isLoggedIn},
        user: null,
        cards: [],
        loading: false
      })
    }
  }

  saveCard = async (card) => {
    if(_.isEmpty(card)) return
    if(card.id) return await Database().changeCard(card)
    card.id = await Database().addCard(card)
  }

  deleteCard = async (index) => {
    await Database().deleteCard(index)
  }

  addCard = async (card) => {
    const newCards = this.state.cards
    newCards.push(card)
    this.setState({
      cards: newCards
    })
  }

  resetAll = async () => {
    await Database().deleteAllCards()
    this.setState({ cards: []})
  }

  deletedCard = async (index) => {
    const fewerCards = this.state.cards.filter((card) => card.id !== index)
    this.setState({
      cards: fewerCards
    })
  }

  editedCard = async(changedCard) => {
    const changedCards = this.state.cards.map(card =>{
      if(card.id === changedCard.id) return changedCard
      return card
    })

    this.setState({
      cards: changedCards
    })
  }

  logout = async () => {
    await Auth().logout().catch(console.error)
  }

  login = async ({login, password}) => {
    await Auth().login(login,password)
    .catch(err => {
        if(err.code === 'auth/wrong-password') {
          console.log('User provides wrong Password')
        }
        else {
          console.error('Login failed please try again', login, password, err)
        }
    })
  }

  render() {
    const {props} = this
    return (
      <div className="App">
        {this.state.loading &&
          <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
          </div>
        }
        {!this.state.loading &&
          <div>
          <UserBar {...props} user={this.state.user} />
          {this.state.auth.isLoggedIn &&
            <div className="contentWrapper">
              <CardAddForm {...props} editCard={this.state.editCard} />
              <div className="print">
                {this.state.cards.map((cardData, i) => {
                  return (<Card {...props} key={i} card={cardData} index={cardData.id} />)
                })}
              </div>
            </div>
          }
          </div>
        }
      </div>
    );
  }
}

export default App;
