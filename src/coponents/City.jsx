import { useContext, useEffect } from "react";
import styles from "./City.module.css";
import { useCities } from "../contexts/CityContex";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const parms = useParams();
  const { fetchCity, currentCity } = useCities();
  const navigate = useNavigate();

  // TEMP DATA
  // const currentCity = {
  //   // dummy data
  //   // fetch
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };
  useEffect(() => {
    console.log(parms);
    fetchCity(parms.id);
  }, [parms]);

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          type="primary"
        >
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default City;
