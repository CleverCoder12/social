import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXqRfvjvzdpM7kXfTtuhpoc-7Xv55gyFQ",
  authDomain: "facebook-ec58c.firebaseapp.com",
  projectId: "facebook-ec58c",
  storageBucket: "facebook-ec58c.appspot.com",
  messagingSenderId: "799609995902",
  appId: "1:799609995902:web:53385d843da877e2fa8e2f",
  measurementId: "G-3K2ES67969"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, storage, auth, provider };
