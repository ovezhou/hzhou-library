// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCAqRCT3NH1Whsr9fkuq5cbWiyr72VUJgA',
  authDomain: 'fit5032-week6-77761.firebaseapp.com',
  projectId: 'fit5032-week6-77761',
  storageBucket: 'fit5032-week6-77761.firebasestorage.app',
  messagingSenderId: '757135067128',
  appId: '1:757135067128:web:cc09acc77e1104f0e9b80d',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()

export { auth, db }
