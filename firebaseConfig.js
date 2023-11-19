// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0FQTqHKiE3X-ElI90gEyZQOS0bXr0njU",
    authDomain: "voiage.firebaseapp.com",
    projectId: "voiage",
    storageBucket: "voiage.appspot.com",
    messagingSenderId: "897547461729",
    appId: "1:897547461729:web:1780d958dd97ee936a3620",
    measurementId: "G-XWR735HGJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, app, storage, getFirestore };
