
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as firebase from "firebase/app"
import { getFirestore } from "firebase/firestore";
import "firebase/auth"
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDY8r-ESt-ppTgP2CzUj_XzVIMVvZhD7ek",
  authDomain: "whatzip-af86d.firebaseapp.com",
  projectId: "whatzip-af86d",
  storageBucket: "whatzip-af86d.appspot.com",
  messagingSenderId: "594949650257",
  appId: "1:594949650257:web:00b0bbb3a6191718ec0570",
  measurementId: "G-RFF1H59LM1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app)