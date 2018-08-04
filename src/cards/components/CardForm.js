import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { BlockPicker } from 'react-color'

import Card from './Card'

const selector = formValueSelector("cardAdd"); 
const extractFormValues = state => {
  const values = selector(
    state,
    "id",
    "name",
    "schwierigkeit",
    "kosten",
    "zauberdauer",
    "reichweite",
    "wirkung",
    "wirkungsdauer",
    "erfolgsgrade.verbesserung",
    "erfolgsgrade.enchanted",
    "color"
  );
  return {
    ...values
  };
}
const ValuedCard = connect(extractFormValues)(Card);
const CustomBlockPicker = ({ input: {value, onChange}}) => (<BlockPicker width="223px" color={value} onChangeComplete={({hex}) => onChange(hex)} triangle="hide" colors={colorPallete}/>)

const InnerCardForm = ({
  id, handleSubmit, pristine, reset, submitting
}) => {
  const selfSubmitHandler = (e) => {
    handleSubmit(e)
    reset()
  }
  const verbesserungen = [
    'Auslösezeit', 'Erschöpfter Fokus', 'Kanalisierter Fokus', 'Reichweite', 'Schaden', 'Verstärken (s.u.)', 'Verzehrter Fokus', 'Wirkungsbereich', 'Wirkungsdauer'
  ]
  return (
  <form className="CardForm" onSubmit={selfSubmitHandler}  autoComplete="off">
  <ol>
    <Field name="id" component={({input: {value}}) => <input type="hidden" value={value}/>}/>
    <dt><label htmlFor="name">Name</label></dt>
      <dd><Field component="input" id="name" name="name" type="text"/></dd>

    <dt><label htmlFor="schwierigkeit">Schwierigkeit</label></dt>
      <dd><Field component="input" id="schwierigkeit" name="schwierigkeit" type="text"/> </dd>

    <dt><label htmlFor="kosten">Kosten</label></dt>
      <dd><Field component="input" id="kosten" name="kosten" type="text"/></dd>

    <dt><label htmlFor="zauberdauer">Zauberdauer</label></dt>
      <dd><Field component="input" id="zauberdauer" name="zauberdauer" type="text"/></dd>

    <dt><label htmlFor="reichweite">Reichweite</label></dt>
      <dd><Field component="input" id="reichweite" name="reichweite" type="text"/></dd>

    <dt><label htmlFor="wirkung">Wirkung</label></dt>
      <dd><Field component="textarea" id="wirkung" name="wirkung" type="text"/></dd>

    <dt><label htmlFor="wirkungsdauer">Wirkungsdauer</label></dt>
      <dd><Field component="input" id="wirkungsdauer" name="wirkungsdauer" type="text"/></dd>

    <dt><label htmlFor="verbesserung">Verbesserungen</label></dt>
    <dd><Field component="select" id="verbesserung" name="erfolgsgrade.verbesserung" multiple size={verbesserungen.length}>
      {verbesserungen.map((value, i) => (<option key={i} >{value}</option>))}
    </Field></dd>

    <dt><label htmlFor="enchanted">Erfolgsgrade</label></dt>
      <dd><Field component="textarea" id="enchanted" name="erfolgsgrade.enchanted" type="text" /></dd>
    <dt>
      {!id && <button type="submit" disabled={pristine || submitting}>Submit</button>}
      {id && <button type="submit" disabled={pristine || submitting}>Update</button>}
      <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
      </button>
    </dt>
  </ol>
  <div>
    <ValuedCard/>
    <Field name="color" component={CustomBlockPicker}/>
  </div>
  </form>
)}
const colorPallete = ['#5533B5','#7751B5','#CC51A6','#FF6589','#FF916B','#FFC55C','#F9F871','#9BDE7E','#4BBC8E','#039590','#1C6E7D','#2F4858','#000000','#444444','#888888','#cccccc','#dddddd','#eeeeee']

const ReduxedCardForm = reduxForm({ form: 'cardAdd' })(InnerCardForm)
const ReduxedValuedForm = connect(extractFormValues)(ReduxedCardForm)

const CardForm = ({addCard, updateCard}) => {
  const submit = (values) => {
    if(values.id)
    {
      console.log(values.id, values)
      return updateCard(values.id, values)
    }
    return addCard(values)
  }

  return (<ReduxedValuedForm onSubmit={submit} />)
}
export default CardForm

