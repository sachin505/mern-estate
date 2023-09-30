// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKuKfDevMzsZp5z4RtGpT06O2cItkVzgY",
  authDomain: "mern-estate-fe534.firebaseapp.com",
  projectId: "mern-estate-fe534",
  storageBucket: "mern-estate-fe534.appspot.com",
  messagingSenderId: "542668049591",
  appId: "1:542668049591:web:0462c14fe326ec596dd132"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);