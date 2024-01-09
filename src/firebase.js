// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADJd505DTWDuvpc3Fd_Edi58Ka0yuWZyE",
  authDomain: "quizz-app-8f341.firebaseapp.com",
  projectId: "quizz-app-8f341",
  storageBucket: "quizz-app-8f341.appspot.com",
  messagingSenderId: "670348637845",
  appId: "1:670348637845:web:024f5b0cbc96cc06230d9c",
  measurementId: "G-3KVX8FECS2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export { app };
