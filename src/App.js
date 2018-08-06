import React from 'react'

import {CardListContainer, CardFormContainer} from './cards/container'
import {UserBarContainer } from './firebase/container'

import './App.css'
import './App.mobile.css'

const App = () => {

  return (
  <div>
    <UserBarContainer />
    <div className="grid">
      <CardFormContainer />
      <CardListContainer />
    </div>
  </div>
)
}
export default App
