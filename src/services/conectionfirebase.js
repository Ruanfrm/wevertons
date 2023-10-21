import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAUYHcoYtrwXJNiXQIDhkI9eTZ2qm44caw",
    authDomain: "cardapiovirtual-d2d6b.firebaseapp.com",
    databaseURL: "https://cardapiovirtual-d2d6b-default-rtdb.firebaseio.com",
    projectId: "cardapiovirtual-d2d6b",
    storageBucket: "cardapiovirtual-d2d6b.appspot.com",
    messagingSenderId: "173010671308",
    appId: "1:173010671308:web:15fd5e2dea8851860a9469"
  };
const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)

const auth = getAuth(firebaseApp);

export {db, auth};