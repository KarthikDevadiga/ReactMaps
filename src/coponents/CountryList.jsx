import PropTypes from "prop-types";

import styles from "./CountryList.module.css";

import CountryItem from "./CountryItem";
export default function CountryList({ cities }) {
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((ele) => ele.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((ele, index) => (
        <CountryItem key={index} country={ele} />
      ))}
    </ul>
  );
}

CountryList.propTypes = {
  cities: PropTypes.array.isRequired,
};
