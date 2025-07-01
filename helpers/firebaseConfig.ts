

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket:  process.env.EXPO_PUBLIC_API_STORAGE,
  messagingSenderId: process.env.EXPO_PUBLIC_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);