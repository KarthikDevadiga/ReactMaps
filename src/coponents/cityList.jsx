import CityItem from "./CityItem";
import { useCities } from "../contexts/CityContex";
import styles from "./CityList.module.css";
export default function CityList() {
  const { cities } = useCities();
  console.log("cities");
  console.log(cities);
  return (
    cities && (
      <ul className={styles.cityList}>
        {cities.map((ele) => (
          <CityItem key={ele.id} city={ele} />
        ))}
      </ul>
    )
  );
}
