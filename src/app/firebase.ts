// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ1Xxfv3hTPY7uxLF7LeHq47glYE2sB9c",
  authDomain: "calaiinternass.firebaseapp.com",
  projectId: "calaiinternass",
  storageBucket: "calaiinternass.appspot.com",
  messagingSenderId: "390887307533",
  appId: "1:390887307533:web:8293d515a2363819271844",
  measurementId: "G-4CWY8WRM8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);