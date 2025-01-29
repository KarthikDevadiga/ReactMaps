import PropTypes from "prop-types";
import Map from "../coponents/Map";
import SideBar from "../coponents/SideBar";
import styles from "./AppLayout.module.css";

export default function AppLayout({ cities }) {
  return (
    <div className={styles.app}>
      <SideBar cities={cities}></SideBar>
      <Map />
    </div>
  );
}

AppLayout.propTypes = {
  cities: PropTypes.array.isRequired, // Ensure `cities` is an array and required
};

// eslint-disable-next-line react/prop-types
