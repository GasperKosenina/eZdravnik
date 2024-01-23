import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwWGW7tkcdEofB7aBjos3GhiyVNXotWCI",
  authDomain: "ezdravnik-ed763.firebaseapp.com",
  projectId: "ezdravnik-ed763",
  storageBucket: "ezdravnik-ed763.appspot.com",
  messagingSenderId: "771795984741",
  appId: "1:771795984741:web:d54209f755c50f4c1bc18c",
  measurementId: "G-64S5Q7SE88"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

