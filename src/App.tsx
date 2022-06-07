import { Table, Select } from "./components";
import { useStarships } from "./hooks";
import { Starship } from "./types/starship";

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
  const {
    starships,
    error,
    loading,
    handleChangeManufacturer,
    manufacturerOptions,
  } = useStarships();

  return (
    <div>
      <Table
        columns={columns}
        rows={starships}
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
