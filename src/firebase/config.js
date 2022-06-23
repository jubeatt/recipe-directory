import firebase from "firebase/app"
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCOUYMuOxcAx6RdFQaAP1U0h3CDlYZmPa8",
  authDomain: "cooking-peanu.firebaseapp.com",
  projectId: "cooking-peanu",
  storageBucket: "cooking-peanu.appspot.com",
  messagingSenderId: "440482144687",
  appId: "1:440482144687:web:58afc44b849f95dd1c0f5a"
}

// init firebase
firebase.initializeApp(firebaseConfig)
// init firestore
const db = firebase.firestore()

export { db }
