'use client';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let isInitialized = false;

export const isFirebaseConfigured = !!(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);

function validateConfig() {
  return isFirebaseConfigured;
}

export function initializeFirebase() {
  if (isInitialized && app && db && auth && storage) {
    return { app, auth, db, storage };
  }

  if (typeof window === 'undefined') {
    console.log('🔧 Firebase: Skipping server-side init');
    return { app, auth, db, storage };
  }

  if (!validateConfig()) {
    console.error('❌ Firebase: Missing required environment variables');
    return { app, auth, db, storage };
  }

  try {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    console.log('🔥 Firebase: Initializing...', { 
      projectId: firebaseConfig.projectId,
      hasApiKey: !!firebaseConfig.apiKey 
    });

    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    isInitialized = true;

    console.log('✅ Firebase: Initialized successfully');
    return { app, auth, db, storage };
  } catch (error) {
    console.error('❌ Firebase: Initialization failed', error);
    return { app, auth, db, storage };
  }
}

export function getFirebaseDb(): Firestore | null {
  if (!db) {
    const result = initializeFirebase();
    return result.db;
  }
  return db;
}

export function getFirebaseAuth(): Auth | null {
  if (!auth) {
    const result = initializeFirebase();
    return result.auth;
  }
  return auth;
}

export function getFirebaseStorage(): FirebaseStorage | null {
  if (!storage) {
    const result = initializeFirebase();
    return result.storage;
  }
  return storage;
}

export { app, auth, db, storage, isInitialized };
