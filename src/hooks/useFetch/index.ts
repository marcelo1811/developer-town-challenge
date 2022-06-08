import { useEffect, useState } from "react";

interface UseFetchResult<ResultType> {
  data: ResultType | null;
  error: any;
  loading: boolean;
}

type Cache = {
  [key: string]: any;
};

const cache: Cache = {};

const useFetch = <ResultType>(url: string): UseFetchResult<ResultType> => {
  const [data, setData] = useState<ResultType | null>(null);
  const [error, setError] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (cache[url]) {
      setData(cache[url]);
      setLoading(false);
      setError(false);
    } else {
      fetch(url)
        .then(async (res) => {
          const data = await res.json();
          if (res.ok) {
            cache[url] = data;
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
    }
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
