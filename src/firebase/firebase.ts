
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyB2a70omA67SaLqwpwCH-n_GnsWqN5Ey9c",
  authDomain: "roohi-1ebaf.firebaseapp.com",
  projectId: "roohi-1ebaf",
  storageBucket: "roohi-1ebaf.appspot.com",
  messagingSenderId: "742767906417",
  appId: "1:742767906417:web:c4760e696d7c39792ed5d0",
  measurementId: "G-8RRCNP5QCV"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth  = getAuth(app);
 export const googleProvider = new GoogleAuthProvider();