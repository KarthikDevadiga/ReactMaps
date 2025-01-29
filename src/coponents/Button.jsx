import PropTypes from "prop-types";

import styles from "./Button.module.css";
export default function Button({ children, onclick, type }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onclick(-1);
      }}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.element.isRequired,
  onclick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
