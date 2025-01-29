// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useRef, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPostion";
import Spinner from "./Spinner";
import Message from "./Message";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [lat, lng] = useUrlPosition();

  let message = useRef("");

  useEffect(() => {
    async function fetchCity() {
      try {
        setIsloading(true);
        setIsError(false);
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        if (!data.countryCode) {
          console.log("error");
          throw new Error("404 NOT FOUND :) Please try with another country");
        }
        setCityName(data.locality || data.city || "");
        setEmoji(convertToEmoji(data.countryCode));
      } catch (e) {
        setIsError(true);
        message.current = e.message;
      } finally {
        setIsloading(false);
      }
    }
    fetchCity();
  }, [lat, lng]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && isError && <Message message={message.current} />}
      {!isLoading && !isError && (
        <form className={styles.form}>
          <div className={styles.row}>
            <label htmlFor="cityName">City name</label>
            <input
              id="cityName"
              onChange={(e) => setCityName(e.target.value)}
              value={cityName}
            />
            <span className={styles.flag}>{emoji}</span>
          </div>

          <div className={styles.row}>
            <label htmlFor="date">When did you go to {cityName}?</label>
            <input
              id="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="notes">Notes about your trip to {cityName}</label>
            <textarea
              id="notes"
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            />
          </div>
          <div className={styles.buttons}>
            <Button type="primary">Add</Button>
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
        </form>
      )}
    </>
  );
  // return isLoading ? (
  //   <Spinner />
  // ) : (
  //   <form className={styles.form}>
  //     <div className={styles.row}>
  //       <label htmlFor="cityName">City name</label>
  //       <input
  //         id="cityName"
  //         onChange={(e) => setCityName(e.target.value)}
  //         value={cityName}
  //       />
  //       <span className={styles.flag}>{emoji}</span>
  //     </div>

  //     <div className={styles.row}>
  //       <label htmlFor="date">When did you go to {cityName}?</label>
  //       <input
  //         id="date"
  //         onChange={(e) => setDate(e.target.value)}
  //         value={date}
  //       />
  //     </div>

  //     <div className={styles.row}>
  //       <label htmlFor="notes">Notes about your trip to {cityName}</label>
  //       <textarea
  //         id="notes"
  //         onChange={(e) => setNotes(e.target.value)}
  //         value={notes}
  //       />
  //     </div>
  //     <div className={styles.buttons}>
  //       <Button type="primary">Add</Button>
  //       <Button
  //         onClick={(e) => {
  //           e.preventDefault();
  //           navigate(-1);
  //         }}
  //         type="primary"
  //       >
  //         &larr; Back
  //       </Button>
  //     </div>
  //   </form>
  // );
}

export default Form;
