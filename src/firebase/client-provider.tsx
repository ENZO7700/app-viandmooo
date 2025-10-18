'use client';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from './index';

import type { ReactNode } from 'react';

export default function FirebaseClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { firebaseApp, firestore, auth } = initializeFirebase();

  return (
    <FirebaseProvider firebaseApp={firebaseApp} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
}
