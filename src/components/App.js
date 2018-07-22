import React, { Component } from 'react'
import {Card, EditableCard} from './Card.js'
import {EventTypes} from '../eventBus'
import {LoginForm} from './LoginForm'
import './App.css'

class App extends Component {  
  constructor(props) {
    super(props)
    
    props.bus.on(EventTypes.CARD_ADDED, this.saveCard)
    props.bus.on(EventTypes.CARD_DELETED, this.deleteCard)
    props.bus.on(EventTypes.CARD_DELETE_ALL, this.resetAll)
    
    const cards = []
    this.state = {
      auth : {isLoggedIn : true},
      cards : cards
    }
  }

  counter = 0
  saveCard = (card) => {
    card.id = this.counter++
    const newCards = this.state.cards
    newCards.push(card)
    this.setState({
      cards: newCards
    })
  }

  resetAll = () => {
    this.setState({ cards: []})
  }

  deleteCard = async (index) => {
    const fewerCards = this.state.cards.filter((card) => card.id !== index)
    this.setState({
      cards: fewerCards
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
