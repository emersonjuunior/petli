// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBH9wupc9bQ8FLlKOuQVOrcfNm2foHd-j8",
  authDomain: "petza-515ad.firebaseapp.com",
  projectId: "petza-515ad",
  storageBucket: "petza-515ad.firebasestorage.app",
  messagingSenderId: "734270875939",
  appId: "1:734270875939:web:55096d16d6aadb61144496",
  measurementId: "G-7JTZYWEKXW",
};

// inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export { db };
