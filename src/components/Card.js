import React, { Component } from 'react'
import EditableLabel from 'react-inline-editing'
import { BlockPicker } from 'react-color'
import _ from 'lodash'
import { EventTypes } from '../eventBus';

class Card extends Component{
  render(){
    return (
      <div className={`block`} style={{backgroundColor: this.props.card.color}}>
        <button className="deleteButton" onClick={() => this.props.bus.emit(EventTypes.CARD_DELETED, this.props.index)}> Löschen </button>
        <table>
          <tbody>
          <tr>
            <th colSpan="6" className="name">
              <h2>{this.props.card.name}</h2>
            </th>
          </tr>
          <tr>
            <th className="">Schw.:</th>
            <td className="schwierigkeit" colSpan="2">{this.props.card.schwierigkeit}</td>
            <th className="">ZD:</th>
            <td className="zauberdauer" colSpan="2">{this.props.card.zauberdauer}</td>
          </tr>
          <tr>
            <th className="">Fokus:</th>
            <td className="kosten">{this.props.card.kosten}</td>
            <th className="">RW:</th>
            <td className="reichweite">{this.props.card.reichweite}</td>
            <th className="">WD:</th>
            <td className="wirkungsdauer">{this.props.card.wirkungsdauer}</td>
          </tr>
          <tr>
            <td className="wirkung" colSpan="6">
              {this.props.card.wirkung}
            </td>
          </tr>
          <tr>
            <th className="erfolgsgrade" colSpan="6">Erfolgsgrade:</th>
          </tr>
          <tr>
            <td className="verbesserung" colSpan="6">{(this.props.card.erfolgsgrade && this.props.card.erfolgsgrade.verbesserung) || ''}</td>
          </tr>
          <tr>
            <td className="enchanted" colSpan="6">{(this.props.card.erfolgsgrade && this.props.card.erfolgsgrade.enchanted) || ''}</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
Card.defaultProps = {
  card: {
    name : 'Einstellung Verbessern',
    color: 'purple',
    schule: 'Beherrschung  0',
    typus: 'Einstellung',
    schwierigkeit: 'GW',
    kosten: 'K1',
    zauberdauer: '3 T',
    reichweite: 'B',
    wirkungsdauer: 'K',
    wirkung: 'Der Zauberer verbessert die Einstellung des Ziels gegenüber einer von ihm bestimmten Person, Idee oder Sache um 1 Stufe (maximal auf Aufgeschlossen). Dieser Zauber benötigt weder Formel noch Geste.',
    erfolgsgrade: {
      verbesserung: 'Auslösezeit, Verstärken',
      enchanted : '2 EG (Kosten +K1V1): Die Einstellung verbessert sich um insgesamt 2 Stufen (maximal auf Hilfsbereit).',
    }
  }
};

class EditableCard extends Card{
  constructor(props){
    super(props)
    this.state = {
      card : this.props.card,
    }

    this.saveSpell = this.saveSpell.bind(this)
  }

  saveSpell = () => {
    this.props.bus.emit(EventTypes.CARD_ADDED, _.clone((this.state.card)))
  }

  deleteAll = () =>{
    this.props.bus.emit(EventTypes.CARD_DELETE_ALL)
  }

  handleColorChange = (color) => {
    const state = this.state
    state.card.color = color.hex
    this.setState(() => state)
  }

  saveStateName = (text) => {
    this.state.card.name = text;
    this.setState(() => this.state)
  }

  resetDefault = () => {
    this.setState(() => ({ card: this.props.card}))
  }

  colorPalette = () => {
    return ['#7751B5','#CC51A6','#FF6589','#FF916B','#FFC55C','#F9F871','#9BDE7E','#4BBC8E','#039590','#1C6E7D','#2F4858','#000000','#eeeeee','#dddddd','#cccccc']
  }
  render() {
    return(
      <div>
        <div className={`block editable`} style={{backgroundColor: this.state.card.color}}>
          <BlockPicker color={this.state.card.color} onChangeComplete={this.handleColorChange} triangle="hide" colors={this.colorPalette()}/>
          <table onClick={(e) => {e.preventDefault(); return true;}}>
            <tbody>
              <tr>
                <th colSpan="6" className="name">
                  <h2><EditableLabel onFocusOut={(text) => {this.state.card.name = text; this.setState(this.state.card)}} text={this.state.card.name || ''}/></h2>
                </th>
              </tr>
              <tr>
                <th className="schwierigkeit">Schw.:</th>
                <td className="schwierigkeit" colSpan="2"><EditableLabel onFocusOut={(text) => {this.state.card.schwierigkeit = text; this.setState(this.state.card)}} text={this.state.card.schwierigkeit}/></td>
                <th className="zauberdauer">ZD:</th>
                <td className="zauberdauer" colSpan="2"><EditableLabel onFocusOut={(text) => {this.state.card.zauberdauer = text; this.setState(this.state.card)}} text={this.state.card.zauberdauer}/></td>
              </tr>
              <tr>
                <th className="kosten">Fokus:</th>
                <td className="kosten"><EditableLabel onFocusOut={(text) => {this.state.card.kosten = text; this.setState(this.state.card)}} text={this.state.card.kosten}/></td>
                <th className="reichweite">RW:</th>
                <td className="reichweite"><EditableLabel onFocusOut={(text) => {this.state.card.reichweite = text; this.setState(this.state.card)}} text={this.state.card.reichweite}/></td>
                <th className="wirkungsdauer">WD:</th>
                <td className="wirkungsdauer"><EditableLabel onFocusOut={(text) => {this.state.card.wirkungsdauer = text; this.setState(this.state.card)}} text={this.state.card.wirkungsdauer}/></td>
              </tr>
              <tr>
                <td className="wirkung" colSpan="6">
                    <EditableLabel onFocusOut={(text) => {this.state.card.wirkung = text; this.setState(this.state.card)}} text={this.state.card.wirkung}/>
                </td>
              </tr>
              <tr>
                <th className="erfolgsgrade" colSpan="6">Erfolgsgrade:</th>
              </tr>
              <tr>
                <td className="verbesserung" colSpan="6"> <EditableLabel onFocusOut={(text) => {this.state.card.erfolgsgrade.verbesserung = text; this.setState(this.state.card)}} text={this.state.card.erfolgsgrade.verbesserung}/></td>
              </tr>
              <tr>
                <td className="enchanted" colSpan="6"> <EditableLabel onFocusOut={(text) => {this.state.card.erfolgsgrade.enchanted = text; this.setState(this.state.card)}} text={this.state.card.erfolgsgrade.enchanted}/></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="noprint">
          <button id="saveSpell" onClick={this.saveSpell}> Save </button> <button id="deleteAll" onClick={this.deleteAll} style={{backgroundColor: "red", color:"white"}}> Delete All </button>
        </div>
      </div>
    )
  }
}

  export {Card, EditableCard}
