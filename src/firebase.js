import config from './config-local'
import firebase from 'firebase/app'
import 'firebase/database';


export const firebaseInit = () => {
    firebase.initializeApp(config);
}

export const database = firebase.database;
