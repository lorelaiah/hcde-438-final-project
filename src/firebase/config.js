import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// import { collection, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAyiAGY5hYuTGnsXZcKDQscoeJS8JJh7MA",
    authDomain: "hcde-438-cb467.firebaseapp.com",
    projectId: "hcde-438-cb467",
    storageBucket: "hcde-438-cb467.firebasestorage.app",
    messagingSenderId: "407114510458",
    appId: "1:407114510458:web:05a4f8828c1ecd9c14cbc3",
    measurementId: "G-SH12S304K4"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb  = getDatabase(app);
