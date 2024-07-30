import styles from "./Result.module.css";

export const Result = ({ clickCounter }) => {
  return (
    <div className={styles.divResult}>
      <p className={styles.pResult}>Congratulations!</p>
      <p className={styles.pResult}>It took you {clickCounter} guesses</p>
    </div>
  );
};
