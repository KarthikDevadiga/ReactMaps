import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <p>App Navigation</p>
      <p>List of cities</p>
      <Footer className={styles.footer} />
    </div>
  );
}
