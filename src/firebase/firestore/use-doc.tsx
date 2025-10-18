'use client';

import { useEffect, useState, useRef } from 'react';
import {
  onSnapshot,
  docEqual,
  type DocumentReference,
  type DocumentData,
  type FirestoreError,
} from 'firebase/firestore';

export function useDoc<T extends DocumentData>(ref: DocumentReference<T> | null) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | undefined>(undefined);
  const refRef = useRef<DocumentReference<T> | null>(null);

  useEffect(() => {
    if (!ref) {
      setData(undefined);
      setLoading(false);
      setError(undefined);
      return;
    }

    if (refRef.current && docEqual(refRef.current, ref)) {
      return;
    }

    refRef.current = ref;
    setLoading(true);

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...snapshot.data() } as unknown as T);
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
  }, [ref ? ref.path : 'null-ref']);

  return { data, loading, error };
}
