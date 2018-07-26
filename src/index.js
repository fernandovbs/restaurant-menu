import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAkbHcsMLWE92ps9qbgt4SUxiWZrh16GsA",
    authDomain: "restaurant-menu-vianna.firebaseapp.com",
    databaseURL: "https://restaurant-menu-vianna.firebaseio.com",
    projectId: "restaurant-menu-vianna",
    storageBucket: "restaurant-menu-vianna.appspot.com",
    messagingSenderId: "1074219845719"
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
