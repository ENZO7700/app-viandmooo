
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { firebaseConfig } from './config';

import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { useUser } from './auth/use-user';
import { FirebaseProvider, useFirebase, useFirebaseApp, useFirestore, useAuth } from './provider';
import FirebaseClientProvider from './client-provider';

let firebaseApp: firebase.app.App;
let auth: firebase.auth.Auth;
let firestore: firebase.firestore.Firestore;

function initializeFirebase() {
  if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    firestore = firebase.firestore();
  } else {
    firebaseApp = firebase.app();
    auth = firebase.auth();
    firestore = firebase.firestore();
  }
  return { firebaseApp, firestore, auth };
}

export {
  initializeFirebase,
  FirebaseProvider,
  FirebaseClientProvider,
  useCollection,
  useDoc,
  useUser,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
};
