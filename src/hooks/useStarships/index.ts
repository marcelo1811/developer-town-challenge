import { useEffect, useMemo, useState } from "react";
import { swapiApiRoutes } from "../../constants";
import { Starship } from "../../types/starship";
import { extractManufacturersFromStarships } from "../../utils";
import removeDuplicates from "../../utils/removeDuplicates";
import useFetch from "../useFetch";

export interface ListStarshipsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Starship[];
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
  ) || {};
  const [starships, setStarships] = useState<Starship[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [filteredStarships, setFilteredStarships] =
    useState<Starship[]>(starships);

  useEffect(() => {
    let newFilteredStarships = starships;
    if (selectedManufacturer) {
      newFilteredStarships = starships.filter((starship) =>
        starship.manufacturer.split(", ").includes(selectedManufacturer)
      );
    }
    setFilteredStarships(newFilteredStarships);
  }, [selectedManufacturer, starships]);

  useEffect(() => {
    if (listStarshipsResponse) {
      const { results, count } = listStarshipsResponse;
      const itemsPerPage = 10;
      const isNotCached = itemsPerPage * currentPage > starships.length;
      if (isNotCached) {
        setStarships((prevState) => {
          const newStarships = removeDuplicates<Starship>([
            ...prevState,
            ...results,
          ]);
          return newStarships;
        });
        setTotalItems(count);
      }
    }
  }, [
    currentPage,
    listStarshipsResponse,
    listStarshipsResponse?.results,
    starships.length,
  ]);

  const handleChangeSelectedManufacturer = (value: string) => {
    setCurrentPage(1);
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
