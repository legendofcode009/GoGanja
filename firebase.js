import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC1NjGt1s8jSV9SjAw74D_xrKOgdtdVafQ",
  authDomain: "goganja-a18f4.firebaseapp.com",
  projectId: "goganja-a18f4",
  storageBucket: "goganja-a18f4.appspot.com",
  messagingSenderId: "290280809723",
  appId: "1:290280809723:web:14fb5735cecf8baebf7c5e",
  measurementId: "G-2NKD0K0F9Z"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};