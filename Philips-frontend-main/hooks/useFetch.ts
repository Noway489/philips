// hooks/useFetch.ts
import { useState, useEffect } from "react";

export function useFetch<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;
    fetcher()
      .then((res) => !canceled && setData(res))
      .catch((err: any) => !canceled && setError(err.message || "Error"))
      .finally(() => !canceled && setLoading(false));
    return () => {
      canceled = true;
    };
  }, [fetcher]);

  return { data, error, loading };
}
