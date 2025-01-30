import styles from "./CityItem.module.css";
import PropTypes from "prop-types";
import { useCities } from "../contexts/CityContex";
import { Link, useParams } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { postCity, deleteCity } = useCities();
  const { currentCity } = useCities();
  const { lat, lng } = city.position;

  function updateCity(e) {
    e.preventDefault();
    deleteCity(city.id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === city.id ? styles["cityItem--active"] : ""
        }`}
        to={`${city.id}?lat=${lat}&lng=${lng}`}
      >
        <div>
          <span className={styles.emoji}>{city.emoji}</span>
          <span className={styles.name}>{city.cityName}</span>
        </div>
        <time className={styles.date}>{formatDate(city.date)}</time>
        <button className={styles.deleteBtn} onClick={updateCity}>
          x
        </button>
      </Link>
    </li>
  );
}

CityItem.propTypes = {
  city: PropTypes.object.isRequired,
};
