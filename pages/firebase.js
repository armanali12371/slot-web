import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDhDZG2MJ9_2opAip73EsK2REwu9GrqBDs",
  authDomain: "slot-173c0.firebaseapp.com",
  projectId: "slot-173c0",
  storageBucket: "slot-173c0.appspot.com", // Fixed "firebasestorage.app" typo
  messagingSenderId: "34882884213",
  appId: "1:34882884213:web:3e6f1742a46d388c231e3c",
  measurementId: "G-2VNT45W8BY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export the auth instance
export const db = getFirestore(app); // Export the Firestore instance
export const storage = getStorage(app);


