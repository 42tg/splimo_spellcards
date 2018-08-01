import React from 'react'

import { BlockPicker } from 'react-color'
const CardForm = ({
  addCard
}) => {
  let name, color, schwierigkeit, zauberdauer, kosten, reichweite, wirkungsdauer, wirkung, verbesserung, enchanted

  const onSubmit = (e) => {
    e.preventDefault()
    const card = {name, color, schwierigkeit, zauberdauer, kosten, reichweite, wirkungsdauer, wirkung, erfolgsgrade: {verbesserung: (verbesserung || []).join(", "), enchanted} }
    addCard(card)
    onReset()
  }

  const onReset = () => {
    name = undefined
    color = undefined
    schwierigkeit = undefined
    zauberdauer = undefined
    kosten = undefined
    reichweite = undefined
    wirkungsdauer = undefined
    wirkung = undefined
    verbesserung = undefined
    enchanted = undefined
  }

  const verbesserungen = [
    'Auslösezeit', 'Erschöpfter Fokus', 'Kanalisierter Fokus', 'Reichweite', 'Schaden', 'Verstärken (s.u.)', 'Verzehrter Fokus', 'Wirkungsbereich', 'Wirkungsdauer'
  ]
  const handleColorChange  = ({hex}) => {
    color = hex
  }
  const colorPallete = ['#5533B5','#7751B5','#CC51A6','#FF6589','#FF916B','#FFC55C','#F9F871','#9BDE7E','#4BBC8E','#039590','#1C6E7D','#2F4858','#000000','#444444','#888888','#cccccc','#dddddd','#eeeeee']
  return (
  <form className="CardForm" onSubmit={onSubmit} onReset={onReset} autoComplete="off">
  <ol>
    <dt><label htmlFor="name">Name</label></dt>
      <dd><input id="name" type="text" value={name} onChange={(e)=> name = e.target.value }/></dd>

    <dt><label htmlFor="schwierigkeit">Schwierigkeit</label></dt>
      <dd><input id="schwierigkeit" type="text" value={schwierigkeit} onChange={(e)=> schwierigkeit = e.target.value }/> </dd>

    <dt><label htmlFor="kosten">Kosten</label></dt>
      <dd><input id="kosten" type="text" value={kosten} onChange={(e)=> kosten = e.target.value }/></dd>

    <dt><label htmlFor="zauberdauer">Zauberdauer</label></dt>
      <dd><input id="zauberdauer" type="text" value={zauberdauer} onChange={(e)=> zauberdauer = e.target.value }/></dd>

    <dt><label htmlFor="reichweite">Reichweite</label></dt>
      <dd><input id="reichweite" type="text" value={reichweite} onChange={(e)=> reichweite = e.target.value }/></dd>

    <dt><label htmlFor="wirkung">Wirkung</label></dt>
      <dd><textarea id="wirkung" type="text" value={wirkung} onChange={(e)=> wirkung = e.target.value }/></dd>

    <dt><label htmlFor="wirkungsdauer">Wirkungsdauer</label></dt>
      <dd><input id="wirkungsdauer" type="text" value={wirkungsdauer} onChange={(e)=> wirkungsdauer = e.target.value }/></dd>

    <dt><label htmlFor="verbesserung">Verbesserungen</label></dt>
    <dd><select id="verbesserung" value={verbesserung} multiple size={verbesserungen.length}
      onChange={(e) => {
        e.preventDefault()
        verbesserung = Array.from(e.target.selectedOptions)
        .map(option => option.value)
      }}>
      {verbesserungen.map((value, i) => (<option key={i} value={value}>{value}</option>))}
    </select></dd>

    <dt><label htmlFor="enchanted">Erfolgsgrade</label></dt>
      <dd><textarea id="enchanted" type="text" value={enchanted} onChange={(e)=> enchanted = e.target.value }/></dd>
    <dt>
      <button type="submit" id="submitCardAddForm">Save</button>
      <button type="reset">Reset</button>
    </dt>
  </ol>
  <div>
    <BlockPicker width="223px" color={color} onChangeComplete={handleColorChange} triangle="hide" colors={colorPallete}/>
  </div>
  </form>
)}

export default CardForm
