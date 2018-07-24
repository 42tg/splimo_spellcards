import React, { Component } from 'react'

import {UserBar} from './UserBar'
import {Card} from './Card'
import {CardAddForm} from './CardAddForm'

import {EventTypes} from '../eventBus'
import {Auth, Database} from './Firebase'

import _ from 'lodash'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    props.bus.on(EventTypes.CARD_ADDED, this.saveCard)
    props.bus.on(EventTypes.CARD_DELETED, this.deleteCard)
    props.bus.on(EventTypes.CARD_DELETE_ALL, this.resetAll)

    props.bus.on(EventTypes.USER_LOGIN, this.login)
    props.bus.on(EventTypes.USER_LOGOUT, this.logout)
    props.bus.on(EventTypes.USER_GOOGLE_LOGIN, Auth().loginWithGoogle)

    Auth().onAuthStateChanged(this.checkLoginState)

    const cards = []
    this.state = {
      auth : {isLoggedIn : false},
      cards : cards
    }
  }

  checkLoginState = async () => {
    const isLoggedIn = await Auth().isLoggedIn()
    if(isLoggedIn)
    {
      this.setState({
        auth: { isLoggedIn : isLoggedIn},
        user: await Auth().getUserData(),
        cards: await Database().getCards()
      })
      console.log(this.state.user)
    } else {
      this.setState({
        auth: { isLoggedIn : isLoggedIn},
        user: null,
        cards: []
      })
    }
  }

  counter = 0
  saveCard = async (card) => {
    if(_.isEmpty(card)) return
    card.id = await Database().addCard(card)
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

  deleteCard = async (index) => {
    await Database().deleteCard(index)
    const fewerCards = this.state.cards.filter((card) => card.id !== index)
    this.setState({
      cards: fewerCards
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
        <UserBar {...props} user={this.state.user} />
        {this.state.auth.isLoggedIn &&
          <div>
            <CardAddForm {...props}/>
            <div className="print">
              {this.state.cards.map((cardData, i) => {
                return (<Card {...props} key={i} card={cardData} index={cardData.id} />)
              })}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
