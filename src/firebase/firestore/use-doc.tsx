
'use client';

import { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

type DocumentReference = firebase.firestore.DocumentReference;
type DocumentData = firebase.firestore.DocumentData;
type FirestoreError = firebase.firestore.FirestoreError;


export function useDoc<T extends DocumentData>(ref: DocumentReference | null) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | undefined>(undefined);
  const refPath = ref ? ref.path : null;

  useEffect(() => {
    if (!ref) {
      setData(undefined);
      setLoading(false);
      setError(undefined);
      return;
    }

    setLoading(true);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.exists) {
          setData({ id: snapshot.id, ...snapshot.data() } as T);
        } else {
          setData(undefined);
        }
        setLoading(false);
        setError(undefined);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [refPath]);

  return { data, loading, error };
}
