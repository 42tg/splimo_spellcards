import React, { Component } from 'react'
import {Card, EditableCard} from './Card.js'
import {Auth, Database} from './Firebase'
import {LoginForm} from './LoginForm'
import './App.css'

class App extends Component {  
  constructor(props) {
    super(props)
    
    const cards = []
    this.state = {
      auth : {isLoggedIn : false},
      cards : cards
    }
  }

  saveCard = (card) => {
    const newCards = this.state.cards
    newCards.push(card)
    this.setState({
      cards: newCards
    })
    Database().addCard(card).catch(console.error)
  }

  resetAll = () => {
    Database().deleteAllCards().catch(console.error)
    this.setState({ cards: []})
  }

  deleteCard = async (index) => {
    Database().deleteCard(index).catch(console.error)
    
    const fewerCards = await Database().getCards().catch(console.error)

    this.setState({
      cards: fewerCards
    })

  }
  handleLogin = async (value, e) => {
    e.preventDefault(); 
    await Auth().login(value.login, value.password).catch((err)=> console.error(err));
    const cards = await Database().getCards().catch(console.error)
    this.setState({auth: {isLoggedIn: Auth().isLoggedIn()}, cards: cards})
  }

  render() {
    return (
      <div className="App">
        {!this.state.auth.isLoggedIn &&
          <LoginForm onSubmit={this.handleLogin}/>
        }
        {this.state.auth.isLoggedIn &&
          (
          <div>
            <EditableCard saveCallback={this.saveCard} resetCallback={this.resetAll}/>
            {this.state.cards.map((cardData, i) => {        
              return (<Card key={i} card={cardData} index={cardData.id} deleteFunction={this.deleteCard}/>) 
            })}
          </div>
        )}
      </div>
    );
  }
}

export default App;
