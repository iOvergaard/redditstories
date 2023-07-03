import styles from "./Spinner.module.css";

export function Spinner() {
  return (
    <div className={styles.heart}><div className={styles.innerheart}></div></div>
  );
}