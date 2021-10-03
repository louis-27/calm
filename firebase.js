import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCvqQYLNflffisyAKGGtoGejXZRn-FnXbc",
  authDomain: "sentiment-ai-mood-tracker.firebaseapp.com",
  projectId: "sentiment-ai-mood-tracker",
  storageBucket: "sentiment-ai-mood-tracker.appspot.com",
  messagingSenderId: "969632790453",
  appId: "1:969632790453:web:49d7ef3b8ba9ea00364bfc",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();

export { db };
