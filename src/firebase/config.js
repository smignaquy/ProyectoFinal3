import app from "firebase/app";
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCheppvEnr02PXXbWzABZWnp9lIPSD4QS0",
    authDomain: "basefinal3.firebaseapp.com",
    projectId: "basefinal3",
    storageBucket: "basefinal3.appspot.com",
    messagingSenderId: "786586585600",
    appId: "1:786586585600:web:9763e8b8bfd88bc330a6e5"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();