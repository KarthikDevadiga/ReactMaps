import style from "./AppNav.module.css";
import { NavLink } from "react-router-dom";

export default function AppNav() {
  return (
    <nav className={style.nav}>
      <ul>
        <li>
          <NavLink to="cities"> cities </NavLink>
        </li>
        <li>
          <NavLink to="countries"> Countries </NavLink>
        </li>
      </ul>
    </nav>
  );
}
