import style from "./Footer.module.css";
export default function Footer() {
  return (
    <div className={style.footer}>
      <p className={style.copyright}>
        &copy; copyright {new Date().getFullYear()} by ReactMaps INC.
      </p>
    </div>
  );
}
