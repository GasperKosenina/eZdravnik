import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSEP8jmhBCjaQC9ZR59cUU3jk5hVdlPe8",
  authDomain: "ezdravnik2.firebaseapp.com",
  projectId: "ezdravnik2",
  storageBucket: "ezdravnik2.appspot.com",
  messagingSenderId: "203434138711",
  appId: "1:203434138711:web:1b984a7d368adc481e9712"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

