import PropTypes from "prop-types";

import styles from "./CountryList.module.css";

import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CityContex";
export default function CountryList() {
  const { cities } = useCities();
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
