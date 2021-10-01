import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA2r8VEiW9RkmkrwQ2-1LzOrA7g4yqCU-c",
  authDomain: "bpm-hackathon-mood-tracker.firebaseapp.com",
  projectId: "bpm-hackathon-mood-tracker",
  storageBucket: "bpm-hackathon-mood-tracker.appspot.com",
  messagingSenderId: "232765848435",
  appId: "1:232765848435:web:7f02f469026935897de306",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();

export { db };
