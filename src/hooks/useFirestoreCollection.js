import { useEffect, useState, useCallback } from 'react';

/**
 * Generic data-fetching hook for any Firestore service created via createCollectionService.
 * Returns { data, loading, error, refetch } so UI can render loading/empty/error states consistently.
 */
export function useFirestoreCollection(service, orderField = 'createdAt', direction = 'desc') {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getAll(orderField, direction);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [service, orderField, direction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
