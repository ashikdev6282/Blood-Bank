// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB--21DW1SDIf6_LMvGwQ0cOq6cgBTnrKE",
  authDomain: "blood-bank-ae3a5.firebaseapp.com",
  projectId: "blood-bank-ae3a5",
  storageBucket: "blood-bank-ae3a5.firebasestorage.app",
  messagingSenderId: "167810730930",
  appId: "1:167810730930:web:a806c94485edfcf9cf32ab",
  measurementId: "G-HRLDZMHDG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);