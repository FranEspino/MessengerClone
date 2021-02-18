import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCH2Kv75GZcxY167XMjhZuetVvE9WlQcM8",
    authDomain: "msg-clone-71ec0.firebaseapp.com",
    projectId: "msg-clone-71ec0",
    storageBucket: "msg-clone-71ec0.appspot.com",
    messagingSenderId: "584204924861",
    appId: "1:584204924861:web:38568bcd573921b64004d4",
    measurementId: "G-X40ZXREY24"

})

const db = firebaseApp.firestore()

export default {db}