import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// These values should ideally be in .env.local
const firebaseConfig = {
  apiKey: "AIzaSyCq7OBXzg_JJF_TuS0oNFeoxWzk-rp8hsM",
  authDomain: "holacxoo.firebaseapp.com",
  projectId: "holacxoo",
  storageBucket: "holacxoo.firebasestorage.app",
  messagingSenderId: "676846359931",
  appId: "1:676846359931:web:b71df9e2e131dda22619de",
  measurementId: "G-465HBHGTVK"
};

// Initialize Firebase (singleton pattern for Next.js)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
