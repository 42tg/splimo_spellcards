import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux'
import {createStore} from 'redux'

import {addCard} from './cards/actions'
import rootReducer from './installReducers'
import makeTestCard from './components/MakeTestCard'

import App from './App'

const store = createStore(rootReducer)

for (let index = 0; index < 100; index++) {
  store.dispatch(addCard(makeTestCard()))
}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));
registerServiceWorker();

