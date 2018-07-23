import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import {EventBus} from './eventBus'

ReactDOM.render( <App bus = {new EventBus()}/>, document.getElementById('root'));
registerServiceWorker();
