// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyAqozZlY4QxHlodi4twPxvpI5HMgC9B2s4",
  authDomain: "diary-8bc16.firebaseapp.com",
  projectId: "diary-8bc16",
  storageBucket: "diary-8bc16.appspot.com",
  messagingSenderId: "45103547197",
  appId: "1:45103547197:web:043caa7a705ab16274fb54",
  measurementId: "G-773QNMJ5XZ"
});
// Initialize Firebase
export const db = getFirestore();
export const storage = getStorage(firebaseConfig);