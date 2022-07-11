import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { collection, getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDgdq3O-oomMjzf6qkupGqCTQk6YSnQt8w",
    authDomain: "prueba-tecnica-athmos.firebaseapp.com",
    projectId: "prueba-tecnica-athmos",
    storageBucket: "prueba-tecnica-athmos.appspot.com",
    messagingSenderId: "448322167124",
    appId: "1:448322167124:web:534bc4f6da7e6d659268c1"
  };

  const app = initializeApp(firebaseConfig)
  const google = new GoogleAuthProvider()
  const auth =  getAuth()
  const db = getFirestore()
  const taskRef = collection(db, 'Task-Users-Athmos')

  export { auth, google, db, taskRef }

