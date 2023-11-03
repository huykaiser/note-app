// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX_1P9QvADAp_A2GEBzXodkJw8tgagoVU",
  authDomain: "note-app-6c8df.firebaseapp.com",
  projectId: "note-app-6c8df",
  storageBucket: "note-app-6c8df.appspot.com",
  messagingSenderId: "661322421729",
  appId: "1:661322421729:web:37c237224919c6e6ff2ea0",
  measurementId: "G-1SC9S8G2PR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
