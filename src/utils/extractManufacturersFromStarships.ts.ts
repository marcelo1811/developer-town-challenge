import { Starship } from "../types/starship";

const extractManufacturersFromStarships = (starships: Starship[]) => {
  const starshipManufacturers = starships.map((starship) =>
    starship.manufacturer.split(",")
  );
  const manufacturers = starshipManufacturers.flatMap((manufacturer) =>
    manufacturer.map((manufacturer) => manufacturer.trim())
  );

  return Array.from(new Set(manufacturers));
};

export default extractManufacturersFromStarships;
