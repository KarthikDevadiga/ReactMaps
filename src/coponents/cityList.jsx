import PropTypes from "prop-types";

import CityItem from "./CityItem";
export default function CityList({ cities }) {
  return (
    <ul>
      {cities.map((ele) => (
        <CityItem key={ele.id} city={ele} />
      ))}
    </ul>
  );
}

CityList.propTypes = {
  cities: PropTypes.array.isRequired,
};
