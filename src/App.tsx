import React, { useEffect, useMemo, useState } from "react";
import { Table, Select } from "./components";
import { SelectOption } from "./components/Select";
import { useStarships } from "./hooks";
import { Starship } from "./types/starship";
import { extractManufacturersFromStarships } from "./utils";

interface StarshipTableColumn {
  name: keyof Starship;
  label: string;
}

const columns: StarshipTableColumn[] = [
  {
    name: "name",
    label: "Name",
  },
  {
    name: "model",
    label: "Model",
  },
  {
    name: "MGLT",
    label: "MGLT",
  },
  {
    name: "cargo_capacity",
    label: "Cargo Capacity",
  },
  {
    name: "consumables",
    label: "Consumables",
  },
  {
    name: "manufacturer",
    label: "Manufacturers",
  },
];

function App() {
  const { starships, error, loading } = useStarships();
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [filteredStarships, setFilteredStarships] =
    useState<Starship[]>(starships);

  useEffect(() => {
    const newStarships = starships.filter((starship) =>
      starship.manufacturer.includes(selectedManufacturer)
    );
    setFilteredStarships(newStarships);
  }, [selectedManufacturer, starships]);

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

  return (
    <div>
      <Table
        columns={columns}
        rows={filteredStarships}
        keyExtractor={(starship) => starship.name}
      />
      <Select
        options={manufacturerOptions}
        onChange={handleChangeManufacturer}
      />
    </div>
  );
}

export default App;
