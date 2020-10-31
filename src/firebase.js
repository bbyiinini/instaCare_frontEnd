import firebase from "firebase";

const db = firebase.initializeApp({
    apiKey: "AIzaSyA9GZJSOfdOiotjcoN0tzhxGIvqBqDtMhQ",
    authDomain: "carego-48c74.firebaseapp.com",
    databaseURL: "https://carego-48c74.firebaseio.com",
    projectId: "carego-48c74",
    storageBucket: "carego-48c74.appspot.com",
    messagingSenderId: "568273047215",
    appId: "1:568273047215:web:16ca31f12db746da5c8e5a",
    measurementId: "G-GRMRPE0J52"
});

export default db;
export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider();