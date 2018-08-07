import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux'
import {createStore} from 'redux'

import rootReducer from './installReducers'

import App from './App'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));
registerServiceWorker();

