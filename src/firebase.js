// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAz9Qi7yN7_Sc5-16SZzw8rna3BVYjvI-I",
  authDomain: "weddingplanner-b0433.firebaseapp.com",
  projectId: "weddingplanner-b0433",
  storageBucket: "weddingplanner-b0433.firebasestorage.app",
  messagingSenderId: "260134505917",
  appId: "1:260134505917:web:915d473bcbb5c01f1796d4",
  measurementId: "G-7GMQBXVR84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();