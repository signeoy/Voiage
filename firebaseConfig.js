// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// New
import { getAuth} from "firebase/auth";
import { getFirestore, collection} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

// New
const auth = getAuth(app);
const db = getFirestore(app);

export {db, auth, app, getFirestore, collection}