import styles from "./loadingSpinner.module.css";

export const LoadingSpinner = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};
