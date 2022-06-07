import { useEffect, useState } from "react";

interface UseFetchResult<ResultType> {
  data: ResultType | null;
  error: any;
  loading: boolean;
}

const useFetch = <ResultType>(url: string): UseFetchResult<ResultType> => {
  const [data, setData] = useState<ResultType | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
