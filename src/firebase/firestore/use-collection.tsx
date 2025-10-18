'use client';

import { useEffect, useState, useRef } from 'react';
import {
  onSnapshot,
  queryEqual,
  type Query,
  type DocumentData,
  type FirestoreError,
} from 'firebase/firestore/lite';

export interface UseCollectionOptions {
  key?: string;
}

export function useCollection<T extends DocumentData>(
  query: Query<T> | null,
  options?: UseCollectionOptions
) {
  const [data, setData] = useState<T[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | undefined>(undefined);
  const queryRef = useRef<Query<T> | null>(null);

  useEffect(() => {
    if (!query) {
      setData(undefined);
      setLoading(false);
      setError(undefined);
      return;
    }

    if (queryRef.current && queryEqual(queryRef.current, query)) {
      return;
    }

    queryRef.current = query;
    setLoading(true);

    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const docs = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as unknown as T)
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
  }, [query ? options?.key ?? query.toString() : 'null-query']);

  return { data, loading, error };
}
