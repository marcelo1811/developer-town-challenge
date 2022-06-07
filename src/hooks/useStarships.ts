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
  totalItems: number;
  currentPage: number;
}

const useStarships = (initialPage: number = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalItems, setTotalItems] = useState(0);

  const {
    data: listStarshipsResponse,
    error,
    loading,
  } = useFetch<ListStarshipsResponse>(
    swapiApiRoutes.listStarships(currentPage)
  );
  const [starships, setStarships] = useState<Starship[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [filteredStarships, setFilteredStarships] =
    useState<Starship[]>(starships);

  useEffect(() => {
    const newFilteredStarships = starships.filter((starship) =>
      starship.manufacturer.includes(selectedManufacturer)
    );
    setFilteredStarships(newFilteredStarships);
  }, [selectedManufacturer, starships]);

  useEffect(() => {
    if (listStarshipsResponse) {
      const { results: newStarships, count } = listStarshipsResponse;
      if (newStarships.length) {
        setStarships(newStarships);
        setTotalItems(count);
      }
    }
  }, [listStarshipsResponse, listStarshipsResponse?.results]);

  const handleChangeSelectedManufacturer = (value: string) => {
    setSelectedManufacturer(value);
  };

  const starshipManufacturers: string[] = useMemo(() => {
    return extractManufacturersFromStarships(starships);
  }, [starships]);

  const handleClickNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleClickPreviousPage = () => {
    setCurrentPage(currentPage - 1);
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
    currentPage,
    totalItems,
  };
};

export default useStarships;
