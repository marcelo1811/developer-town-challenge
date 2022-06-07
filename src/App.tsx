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
    handleChangeSelectedManufacturer,
    starshipManufacturers,
    handleClickPreviousPage,
    handleClickNextPage,
  } = useStarships();

  return (
    <div>
      <Table
        columns={columns}
        rows={starships}
        keyExtractor={(starship) => starship.name}
        loading={loading}
        error={error}
        errorMessage="Fail to retrieve starships"
        onClickNextPage={handleClickNextPage}
        onClickPreviousPage={handleClickPreviousPage}
      />
      <Select onChange={handleChangeSelectedManufacturer}>
        <option value="">All</option>
        {starshipManufacturers.map((manufacturer) => (
          <option key={manufacturer} value={manufacturer}>
            {manufacturer}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default App;
