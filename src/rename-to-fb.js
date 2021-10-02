// Initialize Cloud Firestore through Firebase
import firebase from 'firebase/app'
import 'firebase/firestore'

require('dotenv').config()

// enter your cloud store datas
firebase.initializeApp({
  apiKey: 'your api key',
  authDomain: 'your auth domain',
  projectId: 'your project id',
  storageBucket: 'your storage bucket',
  messagingSenderId: 'your messaging sender id',
  appId: 'your app id',
})

const db = firebase.firestore()

db.settings({ timestampsInSnapshots: true })

export default db
