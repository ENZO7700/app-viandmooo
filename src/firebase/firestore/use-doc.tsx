
'use client';

import { useEffect, useState } from 'react';
import { onSnapshot, type DocumentReference, type DocumentData, type FirestoreError } from 'firebase/firestore';


export function useDoc<T extends DocumentData>(ref: DocumentReference | null) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | undefined>(undefined);
  
  useEffect(() => {
    if (!ref) {
      setData(undefined);
      setLoading(false);
      setError(undefined);
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(ref,
      (snapshot) => {
        if (snapshot.exists()) {
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
  }, [ref]);

  return { data, loading, error };
}
