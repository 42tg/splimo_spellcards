import React, { Component } from 'react'
import { BlockPicker } from 'react-color'
import _ from 'lodash'
import { EventTypes } from '../eventBus';
import {Card} from './Card'

function defaultState() {
  return {
    editMode: false,
    card: {
      name: '',
      color: '',
      schwierigkeit: '',
      kosten: '',
      zauberdauer: '',
      reichweite: '',
      wirkungsdauer: '',
      wirkung: '',
      erfolgsgrade: {
        verbesserung: '',
        enchanted : '',
      }
    }
  }
}
class CardAddForm extends Component {
  constructor(props){
    super(props)
    this.props.bus.on(EventTypes.CARD_EDIT, this.editCard)
    this.state = defaultState()
  }

  setValue = (target, e) => {
    const card = this.state.card
    if(e.target.options) {
      const selectedOptions = Array.from(e.target.options)
      .filter(option => !!option.selected)
      .map(option => option.value)
      _.set(card, target, selectedOptions.join(', '))
    } else {
      _.set(card, target, e.target.value)
    }

    this.setState({card : card})
  }

  editCard = (card) => {
    this.setState({editMode : true, card: card})
  }

  handleColorChange = (color) => {
    const state = this.state
    state.card.color = color.hex
    this.setState(() => state)
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.bus.emit(EventTypes.CARD_SAVE, _.cloneDeep(this.state.card))
    this.setState(defaultState())
  }

  onReset = () => {
    this.setState(defaultState())
  }

  colorPalette = () => {
    return ['#5533B5','#7751B5','#CC51A6','#FF6589','#FF916B','#FFC55C','#F9F871','#9BDE7E','#4BBC8E','#039590','#1C6E7D','#2F4858','#000000','#444444','#888888','#cccccc','#dddddd','#eeeeee']
  }
  render() {

    const verbesserungen = [
      'Auslösezeit', 'Erschöpfter Fokus', 'Kanalisierter Fokus', 'Reichweite', 'Schaden', 'Verstärken (s.u.)', 'Verzehrter Fokus', 'Wirkungsbereich', 'Wirkungsdauer'
    ]
    return(
      <form className="CardForm" onSubmit={this.onSubmit} onReset={this.onReset} autoComplete="off">
      <ol>
        <dt><label htmlFor="name">Name</label></dt>
          <dd><input onChange={this.setValue.bind(null, 'name')} id="name" type="text" value={this.state.card.name}/></dd>

        <dt><label htmlFor="schwierigkeit">Schwierigkeit</label></dt>
          <dd><input onChange={this.setValue.bind(null, 'schwierigkeit')} id="schwierigkeit" type="text" value={this.state.card.schwierigkeit}/> </dd>

        <dt><label htmlFor="kosten">Kosten</label></dt>
          <dd><input onChange={this.setValue.bind(null, 'kosten')} id="kosten" type="text" value={this.state.card.kosten}/></dd>

        <dt><label htmlFor="zauberdauer">Zauberdauer</label></dt>
          <dd><input onChange={this.setValue.bind(null, 'zauberdauer')} id="zauberdauer" type="text" value={this.state.card.zauberdauer}/></dd>

        <dt><label htmlFor="reichweite">Reichweite</label></dt>
          <dd><input onChange={this.setValue.bind(null, 'reichweite')} id="reichweite" type="text" value={this.state.card.reichweite}/></dd>

        <dt><label htmlFor="wirkung">Wirkung</label></dt>
          <dd><textarea onChange={this.setValue.bind(null, 'wirkung')} id="wirkung" type="text" value={this.state.card.wirkung || ''}/></dd>

        <dt><label htmlFor="wirkungsdauer">Wirkungsdauer</label></dt>
          <dd><input onChange={this.setValue.bind(null, 'wirkungsdauer')} id="wirkungsdauer" type="text" value={this.state.card.wirkungsdauer}/></dd>

        <dt><label htmlFor="verbesserung">Verbesserungen</label></dt>
        <dd><select onChange={this.setValue.bind(null, 'erfolgsgrade.verbesserung')} id="verbesserung" value={(this.state.card.erfolgsgrade && this.state.card.erfolgsgrade.verbesserung) && this.state.card.erfolgsgrade.verbesserung.split(', ')} multiple size={verbesserungen.length}>
          {verbesserungen.map((value, i) => (<option key={i} value={value}>{value}</option>))}
        </select></dd>

        <dt><label htmlFor="enchanted">Erfolgsgrade</label></dt>
          <dd><textarea onChange={this.setValue.bind(null, 'erfolgsgrade.enchanted')} id="enchanted" type="text" value={(this.state.card.erfolgsgrade && this.state.card.erfolgsgrade.enchanted) || ''}/></dd>

        <dt>
          <button type="submit" id="submitCardAddForm" >{this.state.editMode && 'Edit'} {!this.state.editMode && 'Save'}</button>
          <button type="reset">Reset</button>
        </dt>
      </ol>
      <div>
        <Card card={this.state.card} hideDeleteButton={true} hideEditButton={true}/>
        <BlockPicker width="223px" color={this.state.card.color} onChangeComplete={this.handleColorChange} triangle="hide" colors={this.colorPalette()}/>
      </div>
      </form>
    )
  }
}

export {CardAddForm}
