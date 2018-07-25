import React, { Component } from 'react'
import { EventTypes } from '../eventBus';

class Card extends Component{
  render(){
    return (
      <div className={`block`} style={{backgroundColor: this.props.card.color}}>
        {!this.props.hideDeleteButton &&
          <button className="deleteButton" onClick={() => this.props.bus.emit(EventTypes.CARD_DELETE, this.props.index)}>Löschen</button>
        }
        <table>
          <tbody>
          <tr>
            <th colSpan="6" className="name">
              <h2>{this.props.card.name}</h2>
            </th>
          </tr>
          <tr>
            <th className="">{this.props.card.schwierigkeit && 'Schw.:'}</th>
            <td className="schwierigkeit" colSpan="2">{this.props.card.schwierigkeit}</td>
            <th className="">{this.props.card.zauberdauer && 'ZD:'}</th>
            <td className="zauberdauer" colSpan="2">{this.props.card.zauberdauer}</td>
          </tr>
          <tr>
            <th className="">{this.props.card.kosten && 'Fokus:'}</th>
            <td className="kosten">{this.props.card.kosten}</td>
            <th className="">{this.props.card.reichweite && 'RW:'}</th>
            <td className="reichweite">{this.props.card.reichweite}</td>
            <th className="">{this.props.card.wirkungsdauer && 'WD:'}</th>
            <td className="wirkungsdauer">{this.props.card.wirkungsdauer}</td>
          </tr>
          <tr>
            <td className="wirkung" colSpan="6">
              {this.props.card.wirkung}
            </td>
          </tr>
          <tr>
            <th className="erfolgsgrade" colSpan="6">{this.props.card.erfolgsgrade && 'Erfolgsgrade:'}</th>
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

export {Card}
