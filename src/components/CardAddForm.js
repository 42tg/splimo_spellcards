import React, { Component } from 'react'
import { BlockPicker } from 'react-color'
import _ from 'lodash'
import { EventTypes } from '../eventBus';
import {Card} from './Card'
class CardAddForm extends Component {
  constructor(props){
    super(props)

    this.state = {card: {}}
  }

  setValue = (target, e) => {
    const card = this.state.card
    if(e.target.options) {
      _.set(card, target, Array.from(e.target.options)
        .filter(option => { console.log(option); return !!option.selected})
        .map(option => option.value)
        .join(', '))
    } else {
      _.set(card, target, e.target.value)
    }
    this.setState({ card : card})
    console.log(target, card)
  }
  handleColorChange = (color) => {
    const state = this.state
    state.card.color = color.hex
    this.setState(() => state)
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.bus.emit(EventTypes.CARD_ADDED, _.cloneDeep(this.state.card))
  }
  colorPalette = () => {
    return ['#5533B5','#7751B5','#CC51A6','#FF6589','#FF916B','#FFC55C','#F9F871','#9BDE7E','#4BBC8E','#039590','#1C6E7D','#2F4858','#000000','#444444','#888888','#cccccc','#dddddd','#eeeeee']
  }
  render() {
    const schwierigkeiten = [
      'GW', 'KW', 'VTD', 'Wert'
    ]
    const verbesserungen = [
      'Auslösezeit', 'Erschöpfter Fokus', 'Kanalisierter Fokus', 'Reichweite', 'Schaden', 'Verzehrter Fokus', 'Wirkungsbereich', 'Wirkungsdauer'
    ]
    return(
      <form className="CardForm" onSubmit={this.onSubmit}>
      <ol>
        <dt><label htmlFor="name">Name</label></dt>
          <dd><input onKeyUp={this.setValue.bind(null, 'name')} id="name" type="text"/></dd>

        <dt><label htmlFor="schwierigkeit">Schwierigkeit</label></dt>
          <dd><select onChange={this.setValue.bind(null, 'schwierigkeit')} id="schwierigkeit">{schwierigkeiten.map((value, i) => (<option key={i} value={value}>{value}</option>))}</select></dd>

        <dt><label htmlFor="zauberdauer">Zauberdauer</label></dt>
          <dd><input onKeyUp={this.setValue.bind(null, 'zauberdauer')} id="zauberdauer" type="text"/></dd>

        <dt><label htmlFor="kosten">Fokus</label></dt>
          <dd><input onKeyUp={this.setValue.bind(null, 'kosten')} id="kosten" type="text"/></dd>

        <dt><label htmlFor="reichweite">Reichweite</label></dt>
          <dd><input onKeyUp={this.setValue.bind(null, 'reichweite')} id="reichweite" type="text"/></dd>

        <dt><label htmlFor="wirkungsdauer">Wirkungsdauer</label></dt>
          <dd><input onKeyUp={this.setValue.bind(null, 'wirkungsdauer')} id="wirkungsdauer" type="text"/></dd>

        <dt><label htmlFor="wirkung">Wirkung</label></dt>
          <dd><textarea onKeyUp={this.setValue.bind(null, 'wirkung')} id="wirkung" type="text"/></dd>

        <dt><label htmlFor="verbesserung">Verbesserungen</label></dt>
        <dd><select onChange={this.setValue.bind(null, 'erfolgsgrade.verbesserung')} id="verbesserung" multiple size={verbesserungen.length}>{verbesserungen.map((value, i) => (<option key={i} value={value}>{value}</option>))}</select></dd>

        <dt><label htmlFor="enchanted">Erfolgsgrade</label></dt>
          <dd><textarea onKeyUp={this.setValue.bind(null, 'erfolgsgrade.enchanted')} id="enchanted" type="text"/></dd>

        <dt><button type="submit">Save</button><button type="reset">Reset</button></dt>
      </ol>
      <div>
        <Card card={this.state.card} hideDeleteButton={true}/>
        <BlockPicker width="223px" color={this.state.card.color} onChangeComplete={this.handleColorChange} triangle="hide" colors={this.colorPalette()}/>
      </div>
      </form>
    )
  }
}

export {CardAddForm}
