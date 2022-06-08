import { Table, Select } from "../../components";
import { useStarships } from "../../hooks";
import { Starship } from "../../types/starship";
import { Container, OptionsContainer } from "./styles";

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
    name: "url",
    label: "url",
  },
  {
    name: "manufacturer",
    label: "Manufacturers",
  },
];

function HomePage() {
  const {
    starships,
    error,
    loading,
    handleChangeSelectedManufacturer,
    starshipManufacturers,
    handleClickPreviousPage,
    handleClickNextPage,
    currentPage,
    totalItems,
    selectedManufacturer,
  } = useStarships();

  return (
    <Container>
      <h1>Starships 🚀</h1>
      <OptionsContainer>
        <p>Choose a manufacturer</p>
        <Select onChange={handleChangeSelectedManufacturer}>
          <option value="">All</option>
          {starshipManufacturers.map((manufacturer) => (
            <option key={manufacturer} value={manufacturer}>
              {manufacturer}
            </option>
          ))}
        </Select>
      </OptionsContainer>
      <Table
        columns={columns}
        rows={starships.slice((currentPage - 1) * 10, currentPage * 10)}
        keyExtractor={(starship) => starship.name}
        loading={loading}
        error={error}
        errorMessage="Fail to retrieve starships"
        onClickNextPage={handleClickNextPage}
        onClickPreviousPage={handleClickPreviousPage}
        totalItems={totalItems}
        currentPage={currentPage}
        highlightWord={selectedManufacturer}
      />
    </Container>
  );
}

export default HomePage;
