// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcwjLsR4dyPw5_LJUbqqjdiWnPzNa0-Lg",
  authDomain: "lifemap-berkaysson.firebaseapp.com",
  projectId: "lifemap-berkaysson",
  storageBucket: "lifemap-berkaysson.appspot.com",
  messagingSenderId: "1090679434631",
  appId: "1:1090679434631:web:476ba129d4d17deb3af722",
  measurementId: "G-M3DYTHC1SX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);