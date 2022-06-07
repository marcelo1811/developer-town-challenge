import React from "react";
import { Table } from "./components";
import { useStarships } from "./hooks";
import { Starship } from "./types/starship";

interface StarshipTableColumn {
  name: keyof Starship;
  label: string;
}

function App() {
  const { starships, error, loading } = useStarships();
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
  ];

  return (
    <div>
      <Table
        columns={columns}
        rows={starships}
        keyExtractor={(starship) => starship.name}
      />
    </div>
  );
}

export default App;
