import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ──────────────────────────────────────────────────────────────
//  Firebase configuration
//  Fill these in your Netlify env vars (VITE_FIREBASE_*) OR
//  paste the values directly below. Until real keys are added,
//  the app runs in a built-in offline fallback mode using
//  localStorage so it still works during the retreat.
// ──────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

export const firebaseReady = Boolean(firebaseConfig.projectId);

let db = null;
let auth = null;

if (firebaseReady) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  } catch (err) {
    console.error("Firebase init failed, falling back to local mode:", err);
  }
}

export { db, auth };
