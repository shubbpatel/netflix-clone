// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA5CnLYKJD4SXgtRI_kPfBiszacIxMaXAc",
  authDomain: "react-netflix-clon-5b69d.firebaseapp.com",
  projectId: "react-netflix-clon-5b69d",
  storageBucket: "react-netflix-clon-5b69d.appspot.com",
  messagingSenderId: "291923954904",
  appId: "1:291923954904:web:eb2aac2c5fa42986479bad",
  measurementId: "G-PXE02RQQTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);