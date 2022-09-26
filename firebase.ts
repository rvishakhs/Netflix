import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFMzvVAvxD0W6em4riY3kcKl8t5VCAhHc",
    authDomain: "netflix-93d39.firebaseapp.com",
    projectId: "netflix-93d39",
    storageBucket: "netflix-93d39.appspot.com",
    messagingSenderId: "156270854121",
    appId: "1:156270854121:web:5657a61cf30e114ff85578"
  };
  

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }