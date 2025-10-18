
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { useUser } from './auth/use-user';
import { FirebaseProvider, useFirebase, useFirebaseApp, useFirestore, useAuth } from './provider';

let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

function initializeFirebase() {
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }
  auth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);

  return { firebaseApp, firestore, auth };
}

export {
  initializeFirebase,
  FirebaseProvider,
  useCollection,
  useDoc,
  useUser,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
};
