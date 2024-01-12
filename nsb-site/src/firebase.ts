// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRzGeVBfSEeMfxINOAM3suWPJSOv2lJn0",
  authDomain: "nsb-site-68449.firebaseapp.com",
  projectId: "nsb-site-68449",
  storageBucket: "nsb-site-68449.appspot.com",
  messagingSenderId: "31223562620",
  appId: "1:31223562620:web:2d9d5216c7707a0f4aa4f9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
