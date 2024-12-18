// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8gIP2FTt-zp5oHm81sfPAbj20Notzq1Q",
  authDomain: "goganja-a18f4.firebaseapp.com",
  projectId: "goganja-a18f4",
  storageBucket: "goganja-a18f4.appspot.com",
  messagingSenderId: "290280809723",
  appId: "1:290280809723:web:297db2d08747a495bf7c5e",
  measurementId: "G-9DL0DPTNX2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
