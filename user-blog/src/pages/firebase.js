
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_ZotIpiD8XSn-e110LjiQ4L3akI9Tx0g",
  authDomain: "weather-blog.firebaseapp.com",
  projectId: "weather-blog",
  storageBucket: "weather-blog.appspot.com",
  messagingSenderId: "181980762336",
  appId: "1:181980762336:web:15da246c09d3f551e94085",
  measurementId: "G-SKK8Y54HTM"
};

// Initialize Firebases

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);