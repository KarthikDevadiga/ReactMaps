import PropTypes from "prop-types";

import CityItem from "./CityItem";
import { useCities } from "../contexts/CityContex";
export default function CityList() {
  const { cities } = useCities();
  return (
    <ul>
      {cities.map((ele) => (
        <CityItem key={ele.id} city={ele} />
      ))}
    </ul>
  );
}
