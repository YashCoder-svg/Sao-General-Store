import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your real Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAwB6u3URlHNvfIDZKFRz-2eDX7u-aDkQg",
  authDomain: "saogeneralstore.firebaseapp.com",
  projectId: "saogeneralstore",
  storageBucket: "saogeneralstore.firebasestorage.app",
  messagingSenderId: "82710028919",
  appId: "1:82710028919:web:efad8569c8620348fcdc72",
  measurementId: "G-EKCD4GMG49"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
