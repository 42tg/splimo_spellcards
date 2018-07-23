import React, { Component } from 'react'

import {Card, EditableCard} from './Card.js'
import {LoginForm} from './LoginForm'

import {EventTypes} from '../eventBus'
import {Auth, Database} from './Firebase'

import './App.css'

class App extends Component {  
  constructor(props) {
    super(props)
    
    props.bus.on(EventTypes.CARD_ADDED, this.saveCard)
    props.bus.on(EventTypes.CARD_DELETED, this.deleteCard)
    props.bus.on(EventTypes.CARD_DELETE_ALL, this.resetAll)
    
    props.bus.on(EventTypes.USER_LOGIN, this.login)

    const cards = []
    this.state = {
      auth : {isLoggedIn : false},
      cards : cards
    }
  }

  counter = 0
  saveCard = async (card) => {
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
  
  login = async ({login, password}) => {
    await Auth().login(login,password)
    .then(async user => {
      this.setState({
        auth: { isLoggedIn : await Auth().isLoggedIn()}, 
        user: await Auth().getUserData(),
        cards: await Database().getCards()
      })

    })
    .catch(err => {
        if(err.code === 'auth/wrong-password') {
          console.log('User provides wrong Password')
        }
        else {
          console.error('Login failed please try again', err)
        }
    })
  }

  render() {
    const {props} = this
    return (
      <div className="App">
        {!this.state.auth.isLoggedIn &&
          <LoginForm {...props}/>
        }
        {this.state.auth.isLoggedIn &&
          (
          <div>
            <EditableCard {...props}/>
            {this.state.cards.map((cardData, i) => {        
              return (<Card {...props} key={i} card={cardData} index={cardData.id} />) 
            })}
          </div>
        )}
      </div>
    );
  }
}

export default App;
