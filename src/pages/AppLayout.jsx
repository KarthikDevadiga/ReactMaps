import PropTypes from "prop-types";
import Map from "../coponents/Map";
import SideBar from "../coponents/SideBar";
import styles from "./AppLayout.module.css";
import { useCities } from "../contexts/CityContex";
import User from "../coponents/User";

export default function AppLayout() {
  const { cities } = useCities();
  return (
    <div className={styles.app}>
      <User />
      <SideBar cities={cities}></SideBar>
      <Map />
    </div>
  );
}

// eslint-disable-next-line react/prop-types
