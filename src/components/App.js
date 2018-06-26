import React, { Component } from 'react'
import {Card, EditableCard} from './Card.js'
import './App.css'
import store from 'store'

class App extends Component {  
  constructor(props) {
    super(props)
    
    const cards = store.get('cards') || []
    this.state = {
      cards : cards
    }
  }

  saveCard = (card) => {
    const newCards = this.state.cards
    newCards.push(card)
    this.setState({
      cards: newCards
    })
    store.set('cards', newCards)
  }

  resetAll = () => {
    this.setState({ cards: []})
    store.remove('cards')
  }

  deleteCard = (index) => {
    const fewerCards = this.state.cards.filter((card, i) => {
      if(i === index) return undefined
      return card
    })

    this.setState({
      cards: fewerCards
    })
    store.set('cards',fewerCards)
  }

  render() {
    return (
      <div className="App">
        <EditableCard saveCallback={this.saveCard} resetCallback={this.resetAll}/>
        <div>
        {this.state.cards.map((cardData, i) => {        
           return (<Card key={i} card={cardData} index={i} deleteFunction={this.deleteCard}/>) 
        })}
        </div>
      </div>
    );
  }
}

export default App;
