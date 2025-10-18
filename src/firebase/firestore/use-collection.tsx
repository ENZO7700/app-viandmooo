
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
  
  // Create a stable string representation of the query
  const queryKey = query ? `${query.path}_${JSON.stringify(query.where)}_${JSON.stringify(query.orderBy)}` : null;

  useEffect(() => {
    if (!query) {
      setData(undefined);
      setLoading(false);
      setError(undefined);
      return;
    }
    
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
  }, [queryKey]); 

  return { data, loading, error };
}
