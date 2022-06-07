import swapiApiRoutes from "../constants";
import { Starship } from "../types/starship";
import useFetch from "./useFetch";

interface ListStarshipsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Starship[];
}

const useStarships = (page: number = 1) => {
  const { data, error, loading } = useFetch<ListStarshipsResponse>(
    swapiApiRoutes.listStarships(page)
  );

  return {
    starships: data?.results || [],
    error,
    loading,
  };
};

export default useStarships;
