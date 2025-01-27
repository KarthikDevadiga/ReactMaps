import Map from "../coponents/Map";
import SideBar from "../coponents/SideBar";
import styles from "./AppLayout.module.css";
export default function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar></SideBar>
      <Map />
    </div>
  );
}
