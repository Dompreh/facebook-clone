import { initializeApp,getApp,getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDnjG_-ioaFuX6XNTyJ8NFHvE5CrgwF-Ts",
    authDomain: "fb-clone-acebd.firebaseapp.com",
    projectId: "fb-clone-acebd",
    storageBucket: "fb-clone-acebd.appspot.com",
    messagingSenderId: "997589719141",
    appId: "1:997589719141:web:1e40264be795e1d9d4ce8c"
  };


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app, db, storage}