import CityItem from "./CityItem";
import { useCities } from "../contexts/CityContex";
import styles from "./CityList.module.css";
export default function CityList() {
  const { cities } = useCities();
  return (
    cities && (
      <ul className={styles.cityList}>
        {cities.map((index, ele) => (
          <CityItem key={ele.id} city={ele} />
        ))}
      </ul>
    )
  );
}
