import React from "react";
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
      <table>
        <thead>
          <tr>
            {columns.map(({ name, label }) => (
              <th key={name}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {starships.map((starship) => (
            <tr key={starship.url}>
              {columns.map(({ name }) => (
                <td key={name}>{starship[name]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
