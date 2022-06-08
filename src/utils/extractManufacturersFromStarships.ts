import { Starship } from "../types/starship";
import removeDuplicates from "./removeDuplicates";

const extractManufacturersFromStarships = (starships: Starship[]) => {
  const starshipManufacturers = starships.map((starship) =>
    starship.manufacturer.split(",")
  );
  const manufacturers = starshipManufacturers.flatMap((manufacturer) =>
    manufacturer.map((manufacturer) => manufacturer.trim())
  );

  return removeDuplicates<string>(manufacturers);
};

export default extractManufacturersFromStarships;
