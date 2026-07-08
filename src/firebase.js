import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_SpG4BFXuQ6_qgmpVoUvRjRWMssTw9yw",
  authDomain: "bamboo-life-465822-v1.firebaseapp.com",
  projectId: "bamboo-life-465822-v1",
  storageBucket: "bamboo-life-465822-v1.firebasestorage.app",
  messagingSenderId: "969487645028",
  appId: "1:969487645028:web:aa77d6012cbd49065d6271"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth & Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
