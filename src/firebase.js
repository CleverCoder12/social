import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  // replace the config
  //and enable google auth firebase firestore  and the storage
  //i'm using firebase v9
  //please like and share my youtube videos and my goal is to reach 2k this year
  //thanks for the support
  //also something is wrong with faker.js api with the images
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, storage, auth, provider };
