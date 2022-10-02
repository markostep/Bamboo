// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4awCBjZR4LEh0M-KY6AglQd40xkPyHc4",
  authDomain: "bamboo-52389.firebaseapp.com",
  projectId: "bamboo-52389",
  storageBucket: "bamboo-52389.appspot.com",
  messagingSenderId: "621289799440",
  appId: "1:621289799440:web:f4e572ef06c132edbcaf95",
  measurementId: "G-GQDWMTNYV8"
};

// Initialize Firebase
let Firebase;
// Initialize Firebase
Firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default Firebase