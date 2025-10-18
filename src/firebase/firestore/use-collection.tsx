
'use client';

import { useEffect, useState } from 'react';
import { onSnapshot, type Query, type DocumentData, type FirestoreError, type SnapshotOptions } from 'firebase/firestore';

export interface UseCollectionOptions {
  key?: string;
}

export function useCollection<T extends DocumentData>(
  query: Query | null,
  options?: UseCollectionOptions & SnapshotOptions
) {
  const [data, setData] = useState<T[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | undefined>(undefined);
  
  // Create a stable string representation of the query
  const queryKey = query ? query.path : null; // Simplified key

  useEffect(() => {
    if (!query) {
      setData(undefined);
      setLoading(false);
      setError(undefined);
      return;
    }
    
    setLoading(true);

    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const docs = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data(options) } as T)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey, JSON.stringify(options)]); 

  return { data, loading, error };
}
