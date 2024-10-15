// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import other services if needed
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtErJ8g05JnutVNbQjGCgArFpX6MFC1VU",
  authDomain: "my-firebase-31476.firebaseapp.com",
  projectId: "my-firebase-31476",
  storageBucket: "my-firebase-31476.appspot.com",
  messagingSenderId: "490352003580",
  appId: "1:490352003580:web:951ae32d4f6203f6e70a79",
  measurementId: "G-NFK4W0F85R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firebase services you want to use
export const auth = getAuth(app);
export const storage = getStorage(app);