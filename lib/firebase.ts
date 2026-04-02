import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// These values should ideally be in .env.local
const firebaseConfig = {
  apiKey: "AIzaSyClhVyqlL4UscSFQYZ8cmawjkivyRcGD2Y",
  authDomain: "holacxo.firebaseapp.com",
  projectId: "holacxo",
  storageBucket: "holacxo.firebasestorage.app",
  messagingSenderId: "898169639130",
  appId: "1:898169639130:web:e21a9cf85b22261e3255e3",
  measurementId: "G-1ZHC6HFTNR"
};

// Initialize Firebase (singleton pattern for Next.js)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
