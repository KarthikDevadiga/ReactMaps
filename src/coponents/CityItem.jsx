import styles from "./CityItem.module.css";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { useCities } from "../contexts/CityContex";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { currentCity } = useCities();
  const { lat, lng } = city.position;
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
        <button className={styles.deleteBtn}>x</button>
      </Link>
    </li>
  );
}

CityItem.propTypes = {
  city: PropTypes.object.isRequired,
};
