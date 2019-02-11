import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { firebaseInit } from './firebase'

firebaseInit()

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
