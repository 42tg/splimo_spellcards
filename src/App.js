import React from 'react'

import {CardListContainer, CardFormContainer} from './cards/container'

import './App.css'
import './App.mobile.css'

const App = () => {
  const submit = (values) => {
    console.log(values)
  }
  return (
  <div>
    <CardFormContainer onSubmit={submit} />
    <div>

    </div>
    <CardListContainer />
  </div>
)
}
export default App
