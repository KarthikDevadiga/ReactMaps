import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";
import PropTypes from "prop-types";

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer className={styles.footer} />
    </div>
  );
}
