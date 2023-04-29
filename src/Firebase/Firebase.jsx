import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQgJRWwgw-b8WfnIFI12rBWd8J9uXyx8Y",
  authDomain: "flavorful-finds.firebaseapp.com",
  projectId: "flavorful-finds",
  storageBucket: "flavorful-finds.appspot.com",
  messagingSenderId: "260598875042",
  appId: "1:260598875042:web:1ba3c48461ed7b0ade28fb",
  measurementId: "G-00B245FDP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
export { auth, provider, db };