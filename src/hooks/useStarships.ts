import { useEffect, useMemo, useState } from "react";
import swapiApiRoutes from "../constants";
import { Starship } from "../types/starship";
import { extractManufacturersFromStarships } from "../utils";
import useFetch from "./useFetch";

interface ListStarshipsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Starship[];
}

const useStarships = (initialPageNumber: number = 1) => {
  const [pageNumber, setPageNumber] = useState(initialPageNumber);
  const { data, error, loading } = useFetch<ListStarshipsResponse>(
    swapiApiRoutes.listStarships(pageNumber)
  );
  const [starships, setStarships] = useState<Starship[]>(data?.results || []);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [filteredStarships, setFilteredStarships] =
    useState<Starship[]>(starships);

  useEffect(() => {
    const newStarships = starships.filter((starship) =>
      starship.manufacturer.includes(selectedManufacturer)
    );
    setFilteredStarships(newStarships);
  }, [selectedManufacturer, starships]);

  useEffect(() => {
    if (data) {
      setStarships(data.results);
    }
  }, [data, data?.results]);

  const handleChangeSelectedManufacturer = (value: string) => {
    setSelectedManufacturer(value);
  };

  const starshipManufacturers: string[] = useMemo(() => {
    return extractManufacturersFromStarships(starships);
  }, [starships]);

  const handleClickNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handleClickPreviousPage = () => {
    setPageNumber(pageNumber - 1);
  };

  return {
    starships: filteredStarships,
    error,
    loading,
    handleChangeSelectedManufacturer,
    selectedManufacturer,
    starshipManufacturers,
    handleClickNextPage,
    handleClickPreviousPage,
  };
};

export default useStarships;
