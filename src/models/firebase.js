// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDPDFgJDtYGqKxlZO-kcQcmi81XiHvYY4",
  authDomain: "api-rest-nodejs-ea239.firebaseapp.com",
  projectId: "api-rest-nodejs-ea239",
  storageBucket: "api-rest-nodejs-ea239.firebasestorage.app",
  messagingSenderId: "463953755967",
  appId: "1:463953755967:web:1677824c9201897b5add8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//inizialize Firebase
const db = getFirestore(app);

export { db };

