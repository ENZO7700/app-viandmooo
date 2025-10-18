
'use client';

import { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export interface UseCollectionOptions {
  key?: string;
}

type Query = firebase.firestore.Query;
type DocumentData = firebase.firestore.DocumentData;
type FirestoreError = firebase.firestore.FirestoreError;

export function useCollection<T extends DocumentData>(
  query: Query | null,
  options?: UseCollectionOptions
) {
  const [data, setData] = useState<T[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | undefined>(undefined);
  const queryRef = useRef<Query | null>(null);

  useEffect(() => {
    if (!query) {
      setData(undefined);
      setLoading(false);
      setError(undefined);
      return;
    }
    
    // Using a custom key or just comparing query objects might not be enough with compat library.
    // A simple way to ensure re-fetch is to rely on a dependency array that changes.
    // The key in options provides a manual way to trigger this.

    setLoading(true);

    const unsubscribe = query.onSnapshot(
      (snapshot) => {
        const docs = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as T)
        );
        setData(docs);
        setLoading(false);
        setError(undefined);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [query ? options?.key : null]); // Simplified dependency

  return { data, loading, error };
}
