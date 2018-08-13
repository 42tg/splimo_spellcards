import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux'
import {createStore, applyMiddleware } from 'redux'

import logger from './logger'

import rootReducer from './installReducers'
import createSagaMiddleware from 'redux-saga'
import CardSaga from './firebase/saga'
import thunk from 'redux-thunk'
import App from './App'

const sagaMiddleware = createSagaMiddleware()

const middleware = [
  logger,
  thunk,
  sagaMiddleware
]

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(
    ...middleware
  )
)

sagaMiddleware.run(CardSaga)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));
registerServiceWorker();

