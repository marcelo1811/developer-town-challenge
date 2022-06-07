import { useEffect, useState } from "react";

interface UseFetchResult<ResultType> {
  data: ResultType | null;
  error: any;
  loading: boolean;
}

const useFetch = <ResultType>(url: string): UseFetchResult<ResultType> => {
  const [data, setData] = useState<ResultType | null>(null);
  const [error, setError] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setError(false);
          setData(data);
        } else {
          throw new Error(data);
        }
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
