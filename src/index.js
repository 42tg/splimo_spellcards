import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'

import rootReducer from './installReducers'
import createSagaMiddleware from 'redux-saga'
import CardSaga from './firebase/saga'

import App from './App'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(CardSaga)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));
registerServiceWorker();

