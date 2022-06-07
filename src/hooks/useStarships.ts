import { useEffect, useMemo, useState } from "react";
import { SelectOption } from "../components/Select";
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

const useStarships = (page: number = 1) => {
  const { data, error, loading } = useFetch<ListStarshipsResponse>(
    swapiApiRoutes.listStarships(page)
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

  const handleChangeManufacturer = (value: string) => {
    setSelectedManufacturer(value);
  };

  const manufacturerOptions: SelectOption[] = useMemo(() => {
    const manufacturers = extractManufacturersFromStarships(starships);
    return manufacturers.map((manufacturer) => ({
      value: manufacturer,
      label: manufacturer,
    }));
  }, [starships]);

  return {
    starships: filteredStarships,
    error,
    loading,
    handleChangeManufacturer,
    selectedManufacturer,
    manufacturerOptions,
  };
};

export default useStarships;
