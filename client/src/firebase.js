// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "project-bodima.firebaseapp.com",
  projectId: "project-bodima",
  storageBucket: "project-bodima.appspot.com",
  messagingSenderId: "1019094997505",
  appId: "1:1019094997505:web:e82d0670869db04b6f3e00"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);